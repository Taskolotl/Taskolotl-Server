import * as express from "express";
import * as sqlite3 from 'sqlite3';
import * as bodyParser from 'body-parser';
import * as schedule from 'node-schedule';

import { TaskolotlStateRetriever } from "./TaskolotlStateRetriever";
import { CurrentDateRetriever } from "./CurrentDateRetriever";
import { TaskolotlStateUpdater } from "./TaskolotlStateUpdater";

const databaseName: string = 'mydatabase.db';

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
      const b = new TaskolotlStateUpdater();

      const jsonString = JSON.stringify(req.body);
      console.log("---------------");
      console.log(jsonString);
      console.log("---------------");

      res.json(b.updateTaskolotlState(jsonString, CurrentDateRetriever.getCurrentDate()));
    } catch (error) {
      // Handle any parsing or processing errors
      res.status(400).json({ error: 'Invalid request body' });
    }
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
