import * as express from "express";
import * as sqlite3 from 'sqlite3';
import * as bodyParser from 'body-parser';

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

function parseEntriesFromRequest(req: any): Entry[] {
    const entries: Entry[] = [];
  
    // Assuming the entries are passed as an array in the request body
    const entryData = req.body.entries;
  
    if (Array.isArray(entryData)) {
      entryData.forEach((entry: any) => {
        const { datetime, category, name, finished } = entry;
        const parsedEntry: Entry = {
          datetime: datetime || '',
          category: category || '',
          name: name || '',
          finished: !!finished,
        };
        entries.push(parsedEntry);
      });
    }
  
    return entries;
  }

function groupEntriesByCategory(entries: Entry[]): Map<string, Entry[]> {
    const entriesByCategory = new Map<string, Entry[]>();
  
    entries.forEach((entry) => {
      const { category } = entry;
  
      if (entriesByCategory.has(category)) {
        entriesByCategory.get(category)!.push(entry);
      } else {
        entriesByCategory.set(category, [entry]);
      }
    });
  
    return entriesByCategory;
  }

// Function to get entries for a specific date and group them by category
function getEntriesGroupedByCategory(date: string): Promise<Map<string, Entry[]>> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('mydatabase.db');
  
      // Select all entries from the table
      const query = `SELECT * FROM entries`;
      db.all(query, [], (err, rows: Entry[]) => {
        if (err) {
          console.error('Error retrieving entries:', err.message);
          reject(err);
        } else {

            // Process the entries and group them by category
            const entriesByCategory = groupEntriesByCategory(rows);
            resolve(entriesByCategory);
        }
  
        // Close the database connection
        db.close();
      });
    });
  }

function getCurrentDate() {
    const currentDate = new Date();
  
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: January is 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = String(currentDate.getFullYear());
  
    const formattedDate = `${month}-${day}-${year}`;
  
    return formattedDate;
}

function printTaskCategory(taskCategory: TaskCategory): void {
    console.log(`Category Name: ${taskCategory.categoryName}`);
    console.log('Task Data:');
    taskCategory.taskData.forEach(([task, status]) => {
      console.log(`Task: ${task}, Status: ${status}`);
    });
  }

function updateEntriesInDatabase(entries: Entry[]) {
    const db = new sqlite3.Database('mydatabase.db');
  
    console.log(entries); // Verify if entries are populated correctly
  
    entries.forEach((entry) => {
      const { datetime, category, name, finished } = entry;
  
      // Construct the update query
      const updateQuery = `
        UPDATE entries
        SET finished = ?
        WHERE datetime = ? AND category = ? AND name = ?;
      `;
  
      // Execute the update query
      db.run(updateQuery, [finished, datetime, category, name], function (error) {
        if (error) {
          console.error('Error updating entry:', error.message); // Log the error message
        } else {
          console.log(`Entry updated successfully. Rows affected: ${this.changes}`);
        }
      });
    });
  
    // Close the database connection
    db.close();
  }

  function updateEntryFinished(taskCategory: TaskCategory, currentDate: string): void {
    const db = new sqlite3.Database('mydatabase.db');

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

const app = express();
const port = 3000;

app.use(express.static("assets"));
app.use(express.static("client/dist"));

app.get('/', (req, res) => {
    res.sendFile("homepage.html", {root: "./assets"});
})

// GET request route handler
app.get('/api/data', (req, res) => {
    console.log("Got here!");
    // Simulated data - replace with your actual data retrieval logic
    const data: { categoryName: string; taskData: [string, boolean][] }[] = [];
    const currentDate = getCurrentDate();
  
    getEntriesGroupedByCategory(currentDate)
      .then((entriesByCategory) => {
        entriesByCategory.forEach((entries, category) => {
          const stringData = category;
          console.log("CATEGORY: " + category);
  
          const pairData: [string, boolean][] = [];
  
          entries.forEach((entry) => {
            pairData.push([entry.name, entry.finished]);
          });
  
          const bundle = {
            categoryName: stringData,
            taskData: pairData,
          };
  
          data.push(bundle);
        });
  
        res.json(data);
      })
      .catch((error) => {
        console.error('Error retrieving entries:', error);
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
        printTaskCategory(category);
        updateEntryFinished(category, getCurrentDate());
        const { categoryName, taskData } = category;
        const parsedTaskData: [string, boolean][] = taskData.map(([task, status]) => [task, Boolean(status)]);
        return { categoryName, taskData: parsedTaskData };
      });
  
      // Now you have the parsedTaskCategories array of TaskCategory objects
      // You can store or perform any desired operations with it on the server-side
  
      // Respond with the parsedTaskCategories or any other response as needed
      res.json(200);
    } catch (error) {
      // Handle any parsing or processing errors
      console.error(error);
      res.status(400).json({ error: 'Invalid request body' });
    }
  });

app.listen(port, () => {
    console.log("Example app listening on port ${port}");
})
