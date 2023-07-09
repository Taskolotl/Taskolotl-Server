import * as express from "express";
import * as sqlite3 from 'sqlite3';
import * as bodyParser from 'body-parser';
import * as schedule from 'node-schedule';

import { TaskolotlStateRetriever } from "./TaskolotlStateRetriever";
import { CurrentDateRetriever } from "./CurrentDateRetriever";

const databaseName: string = 'mydatabase.db';

interface Entry {
    datetime: string;
    category: string;
    name: string;
    finished: boolean;
}

interface TaskCategory {
    categoryName: string;
    taskData: [string, boolean][];
}


function getCurrentDate() {
    const currentDate = new Date();
  
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: January is 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = String(currentDate.getFullYear());
  
    const formattedDate = `${month}-${day}-${year}`;
  
    return formattedDate;
}

  function updateEntryFinished(taskCategory: TaskCategory, currentDate: string): void {
    const db = new sqlite3.Database(databaseName);

    taskCategory.taskData.forEach(([taskName, finished]) => {
      // Prepare the SQL statement
      const updateStatement = db.prepare(
        'UPDATE entries SET finished = ? WHERE datetime = ? AND category = ? AND name = ?'
      );
  
      // Convert the boolean finished status to an integer
      const finishedValue = finished ? 1 : 0;
  
      // Execute the SQL statement with the appropriate values
      updateStatement.run(finishedValue, currentDate, taskCategory.categoryName, taskName);
  
      // Finalize the statement
      updateStatement.finalize();
    });
  }

  function getSumOfFinishedValues(datetime: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
    
        const query = `
          SELECT AVG(score) as averageScore
          FROM CategoryTable
          WHERE datetime = ?`;
    
        db.get(query, [datetime], (err: Error | null, row: any) => {
          if (err) {
            reject(err);
          } else {
            const averageScore = row && row.averageScore !== null ? row.averageScore : -1;
            resolve(averageScore);
          }
    
          db.close();
        });
      });
  }

  function setCategoryScore(categoryName: string, datetime: string, score: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
  
      const query = `UPDATE CategoryTable SET score = ? WHERE category = ? AND datetime = ?`;
  
      db.run(query, [score, categoryName, datetime], function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
  
        db.close();
      });
    });
  }

const app = express();
const port = 3000;

app.use(express.static("assets"));
app.use(express.static("client/dist"));

app.get('/', (req, res) => {
    res.sendFile("homepage.html", {root: "./assets"});
})

// GET request route handler
app.get('/api/data', (req, res) => {
    const a = new TaskolotlStateRetriever();

    a.getTaskolotlState(CurrentDateRetriever.getCurrentDate()).then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);  
    });
});

  app.use(bodyParser.json());

  app.post('/api/taskdata', (req, res) => {
    try {
      // Step 1: Obtain the JSON string from the POST request data
      const jsonString = JSON.stringify(req.body);
  
      // Step 2: Parse the JSON string into a JavaScript object
      const taskCategories: TaskCategory[] = JSON.parse(jsonString);
  
      // Step 3: Iterate over the array and create TaskCategory instances
      const parsedTaskCategories: TaskCategory[] = taskCategories.map(category => {
        updateEntryFinished(category, getCurrentDate());
        const { categoryName, taskData } = category;
        const parsedTaskData: [string, boolean][] = taskData.map(([task, status]) => [task, Boolean(status)]);

        const trueCount = parsedTaskData.reduce((count, [, status]) => count + Number(status), 0);
        const totalCount = parsedTaskData.length;
        const averageTrueCount = totalCount > 0 ? trueCount / totalCount : 0;

        setCategoryScore(category.categoryName, getCurrentDate(), averageTrueCount);

        return { categoryName, taskData: parsedTaskData };
      });
  
      const response = [201, 202, 203];

      res.json(response);
    } catch (error) {
      // Handle any parsing or processing errors
      res.status(400).json({ error: 'Invalid request body' });
    }
  });

  app.get('/api/updatedScores', (req, res) => {
    getSumOfFinishedValues(getCurrentDate())
    .then((sum) => {
      const response = [sum, 202, 203];

      res.json(response); // Return the scores as JSON
    })
    .catch((err) => {
    });

    
  });

app.listen(port, () => {
})

function addEntryToCategoryTable(date: string, category: string, average: number, previousAverage: number, score: number) {
    const db = new sqlite3.Database('mydatabase.db');
    const tableName = 'CategoryTable';
  
    // Construct the SQL query to insert a new entry into the table
    const query = `
      INSERT INTO ${tableName} (datetime, category, average, previousAverage, score)
      VALUES (?, ?, ?, ?, ?);
    `;
  
    // Execute the query to insert the new entry
    db.run(query, [date, category, average, previousAverage, score], function (error) {
      if (error) {
      } else {
      }
  
      // Close the database connection
      db.close();
    });
  }

  function addEntry(datetime: string, category: string, name: string, finished: boolean) {
    const db = new sqlite3.Database('mydatabase.db');
  
    // Insert the entry into the table
    const query = `
      INSERT INTO entries (datetime, category, name, finished)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [datetime, category, name, finished], function (err) {
      if (err) {
      } else {
      }
    });
  
    // Close the database connection
    db.close();
  }


// Define the task to be executed at 12:05 AM
const midnightTask = () => {
  };
  
// Schedule the task to run every night at 12:05 AM
const job = schedule.scheduleJob('5 0 * * *', midnightTask);
