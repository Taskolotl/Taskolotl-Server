import { TaskolotlStateRetriever } from "../../src/TaskolotlStateRetriever";
const { execSync } = require('child_process');
import { TaskolotlState } from "../../src/TaskolotlState";
import * as sqlite3 from 'sqlite3';

function addEntryToCategoryTable(date: string, category: string, average: number, previousAverage: number, score: number) {
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
      } else {
      }
  
      // Close the database connection
      db.close();
    });
}

// Function to add an entry to the table
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


function runCommand(command: string) {
    execSync(command, { stdio: 'inherit' });
}

describe('Testing getting state', () => {
  test('Test 1 1 1', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);

    const a = new TaskolotlStateRetriever();

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
        const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", false]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        expect(err).toBeUndefined();
    });
  });
});