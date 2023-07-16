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

      b.updateTaskolotlState(jsonString, CurrentDateRetriever.getCurrentDate()).then(response => {
        res.json(response);
      })
      .catch((err) => {
        console.log(err);  
      });
    
    } catch (error) {
      // Handle any parsing or processing errors
      res.status(400).json({ error: 'Invalid request body' });
    }
  });


app.listen(port, () => {
})

function addEntryToCategoryTable(date: string, category: string, average: number, previousAverage: number, score: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('mydatabase.db');
    const tableName = 'CategoryTable';
  
    // Construct the SQL query to insert a new entry into the table
    const query = `
      INSERT INTO ${tableName} (datetime, category, score)
      VALUES (?, ?, ?);
    `;
  
    // Execute the query to insert the new entry
    db.run(query, [date, category, score], function (error) {
      if (error) {
        reject(error);
      } else {
        db.close(err => {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        });
      }
    });
  });
}

// Function to add an entry to the table
function addEntry(datetime: string, category: string, name: string, finished: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('mydatabase.db');

    // Insert the entry into the table
    const query = `
      INSERT INTO entries (datetime, category, name, finished)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [datetime, category, name, finished], function (err) {
      if (err) {
        reject(err);
      } 
      else {
        // Close the database connection
        db.close(err => {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        });
      }
    });

  });
}


// Define the task to be executed at 12:05 AM
const midnightTask = async () => {
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Faith", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Current Relationships", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Diet", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Studying", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Atlas", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Housework", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Gamedev", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Webdev", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Hygiene", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Exercise", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Wakeup", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Galatians", 0, 0, 0);
  await addEntryToCategoryTable(CurrentDateRetriever.getCurrentDate(), "Work", 0, 0, 0);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Faith", "Pray", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Faith", "Truly and honestly seek God", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Faith", "NF", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Faith", "No swearing", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Faith", "Read scripture", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Faith", "Don't read scans you didn't pay for", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Mom", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Dad", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Charlie", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Ryan", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Max", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Joey", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough fruit", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough veggies", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough protein", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough carbs", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough water", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study gamedev", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study webdev frontend", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study backend", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study UI UX", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Project Management", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study C++", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Java", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Typescript", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Security", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study cooking", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Atlas", "15 minutes play", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Atlas", "15 minutes pets", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Atlas", "Greenies", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Atlas", "Proper Diet", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Atlas", "Clean water", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Atlas", "Litter box", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room trash pickup", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room vacuum", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room clutter", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room laundry pickup", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Clean bathroom sink", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Clean bathroom mirror", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Clean tub if it needs cleaning", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Clean shower walls if needed", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Wash bathroom floor if needed", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Clean fridge if needed", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit kitchen trash", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Dishes completely done", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit wash counters and sink", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Wash stove if needed", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Clean kitchen floor if needed", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit kitchen clutter", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Do a load of laundry if there's enough", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit vacuum office", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit office clutter", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Clean litter boxes", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Take out trash if its full", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit vacuum dining room", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit trash dining room", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit clutter dining room", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Shred junk mail", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "Get mail", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Housework", "One unit vacuum hallway", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Gamedev", "One unit gamedev", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Webdev", "One unit webdev", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Dental trio one", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Dental trio two", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Shower", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Wash face one", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Moisturize one", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Moisturize two", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Wash face two", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Zits + acne patches", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "Shave", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Hygiene", "New pillowcase", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Exercise", "Exercise", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Wakeup", "Wake up at 6AM. Get right out of bed", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be patient", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be kind", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be humble", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be generous", false);
  await addEntry(CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to hold back from anger", false);

  await addEntry(CurrentDateRetriever.getCurrentDate(), "Work", "5 hours of concentrated work", false);
};
  
// Schedule the task to run every night at 12:05 AM
const job = schedule.scheduleJob('5 0 * * *', midnightTask);
