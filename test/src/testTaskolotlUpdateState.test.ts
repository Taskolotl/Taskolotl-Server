import { TaskolotlStateRetriever } from "../../src/TaskolotlStateRetriever";
const { execSync } = require('child_process');
import { TaskolotlState } from "../../src/TaskolotlState";
import { TaskolotlStateUpdater } from "../../src/TaskolotlStateUpdater";
import * as sqlite3 from 'sqlite3';
import { json } from "body-parser";

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

function runCommand(command: string) {
    execSync(command, { stdio: 'inherit' });
}

describe('Testing getting state', () => {
    test('Test 1 1 1', async () => {
      runCommand('del mydatabase.db');
      runCommand('node ../createDB.js');
      
      await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
      await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
  
      const a = new TaskolotlStateRetriever();
      const b = new TaskolotlStateUpdater();
  
    const jsonString = '[{"score":0,"average":0,"previousAverage":-1,"categoryName":"Test-Category-1","taskData":[["Test-Habit-1",true]]}]'

        b.updateTaskolotlState(jsonString, "2023-6-24");

      await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
          const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", false]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};
  
        expect(response).toEqual(null);
      })
      .catch((err: Error) => {
          console.log(err);
          expect(err).toBeUndefined();
      });
    });

    // test('Test 1 3 1', async () => {
    //     runCommand('del mydatabase.db');
    //     runCommand('node ../createDB.js');
        
    //     await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-2", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-3", false);
    
    //     const a = new TaskolotlStateRetriever();
    
    //     await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
    //       const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", false], ["Test-Habit-2", false], ["Test-Habit-3", false]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};
    
    //       expect(response).toEqual(expectedResult);
    //     })
    //     .catch((err: Error) => {
    //         console.log(err);
    //         expect(err).toBeUndefined();
    //     });
    //   });
    
    //   test('Test 2 2 1', async () => {
    //     runCommand('del mydatabase.db');
    //     runCommand('node ../createDB.js');
        
    //     await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    //     await addEntryToCategoryTable("2023-6-24", "Test-Category-2", 0, 0, 0);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-2", false);
    //     await addEntry("2023-6-24", "Test-Category-2", "Test-Habit-1", false);
    //     await addEntry("2023-6-24", "Test-Category-2", "Test-Habit-2", false);
    
    //     const a = new TaskolotlStateRetriever();
    
    //     await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
    //       const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", false], ["Test-Habit-2", false]]}, {"average": 0, "categoryName": "Test-Category-2", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", false], ["Test-Habit-2", false]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};
    
    //       expect(response).toEqual(expectedResult);
    //     })
    //     .catch((err: Error) => {
    //         console.log(err);
    //         expect(err).toBeUndefined();
    //     });
    //   });
    
    //   test('Test 1 1 2', async () => {
    //     runCommand('del mydatabase.db');
    //     runCommand('node ../createDB.js');
        
    //     await addEntryToCategoryTable("2023-6-23", "Test-Category-1", 0, 0, 0);
    //     await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    //     await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-1", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
    
    //     const a = new TaskolotlStateRetriever();
    
    //     await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
    //       const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": 0, "score": 0, "taskData": [["Test-Habit-1", false]]}], "scoringData": {"average": 0, "previousAverage": 0, "score": 0}};
    
    //       expect(response).toEqual(expectedResult);
    //     })
    //     .catch((err: Error) => {
    //         console.log(err);
    //         expect(err).toBeUndefined();
    //     });
    //   });
    
    //   test('Test 1 4 2', async () => {
    //     runCommand('del mydatabase.db');
    //     runCommand('node ../createDB.js');
        
    //     await addEntryToCategoryTable("2023-6-23", "Test-Category-1", 0, 0, 0);
    //     await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    //     await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-1", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
    //     await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-2", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-2", false);
    //     await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-3", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-3", false);
    //     await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-4", false);
    //     await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-4", false);
    
    //     const a = new TaskolotlStateRetriever();
    
    //     await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
    //       const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": 0, "score": 0, "taskData": [["Test-Habit-1", false], ["Test-Habit-2", false], ["Test-Habit-3", false], 
    //       ["Test-Habit-4", false]]}], "scoringData": {"average": 0, "previousAverage": 0, "score": 0}};
    
    //       expect(response).toEqual(expectedResult);
    //     })
    //     .catch((err: Error) => {
    //         console.log(err);
    //         expect(err).toBeUndefined();
    //     });
    //   });
  });