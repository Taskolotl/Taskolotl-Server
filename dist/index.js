"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const TaskolotlStateRetriever_1 = require("./TaskolotlStateRetriever");
const CurrentDateRetriever_1 = require("./CurrentDateRetriever");
const TaskolotlStateUpdater_1 = require("./TaskolotlStateUpdater");
const databaseName = 'mydatabase.db';
const app = express();
const port = 3000;
app.use(express.static("assets"));
app.use(express.static("client/dist"));
app.get('/', (req, res) => {
    res.sendFile("homepage.html", { root: "./assets" });
});
// GET request route handler
app.get('/api/data', (req, res) => {
    const a = new TaskolotlStateRetriever_1.TaskolotlStateRetriever();
    a.getTaskolotlState(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate()).then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err);
    });
});
app.use(bodyParser.json());
app.post('/api/taskdata', (req, res) => {
    try {
        const b = new TaskolotlStateUpdater_1.TaskolotlStateUpdater();
        const jsonString = JSON.stringify(req.body);
        b.updateTaskolotlState(jsonString, CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate()).then(response => {
            res.json(response);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    catch (error) {
        // Handle any parsing or processing errors
        res.status(400).json({ error: 'Invalid request body' });
    }
});
app.listen(port, () => {
});
function addEntryToCategoryTable(date, category, average, previousAverage, score) {
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
            }
            else {
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
function addEntry(datetime, category, name, finished) {
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
const midnightTask = () => __awaiter(void 0, void 0, void 0, function* () {
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Faith", "Pray", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Faith", "Truly and honestly seek God", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Faith", "NF", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Faith", "No swearing", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Faith", "Read scripture", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Faith", "Do not read scans you did not pay for", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Mom", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Dad", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Charlie", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Ryan", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Max", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Joey", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Current Relationships", "Todd", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough fruit", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough veggies", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough protein", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough carbs", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Diet", "Get enough water", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study gamedev", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study webdev frontend", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study backend", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study UI UX", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Project Management", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study C++", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Java", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Typescript", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study Security", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Studying", "One unit study cooking", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Atlas", "15 minutes play", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Atlas", "15 minutes pets", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Atlas", "Greenies", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Atlas", "Proper Diet", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Atlas", "Clean water", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Atlas", "Litter box", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room trash pickup", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room vacuum", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room clutter", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit living room laundry pickup", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Clean bathroom sink", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Clean bathroom mirror", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Clean tub if it needs cleaning", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Clean shower walls if needed", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Wash bathroom floor if needed", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit bathroom trash", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit bathroom clutter", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit bathroom laundry", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Clean fridge if needed", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit kitchen trash", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Dishes completely done", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit wash counters and sink", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Wash stove if needed", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Clean kitchen floor if needed", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit kitchen clutter", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Do a load of laundry if there is enough", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit vacuum office", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit office clutter", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit office trash", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Clean litter boxes", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Take out trash if its full", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit vacuum dining room", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit trash dining room", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit clutter dining room", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Shred junk mail", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "Get mail", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Housework", "One unit vacuum hallway", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Gamedev", "One unit gamedev", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Webdev", "One unit webdev", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Dental trio one", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Dental trio two", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Shower", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Wash face one", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Moisturize one", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Moisturize two", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Wash face two", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Zits + acne patches", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "Shave", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Hygiene", "New pillowcase", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Exercise", "Exercise", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Wakeup", "Wake up at 6AM. Get right out of bed", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be patient", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be kind", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be humble", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to be generous", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Galatians", "Find a moment to hold back from anger", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro One", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Two", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Three", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Four", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Five", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Six", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Seven", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Eight", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Nine", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Ten", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Eleven", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Work", "Pomodoro Twelve", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Budget", "Manage the budget", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "New Relationships", "Work on building a rapport with a new person", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "New Relationships", "Take a risk", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Mom", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Dad", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Charlie", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Ryan", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Max", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Todd", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Joey", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Tyson", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Preston", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "George", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Brian", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Matt", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Lita", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "Ryan C", false);
    yield addEntry(CurrentDateRetriever_1.CurrentDateRetriever.getCurrentDate(), "Empathy", "God", false);
});
// Schedule the task to run every night at 12:05 AM
const job = schedule.scheduleJob('5 0 * * *', midnightTask);
//# sourceMappingURL=index.js.map