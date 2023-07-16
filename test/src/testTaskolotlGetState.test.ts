import { TaskolotlStateRetriever } from "../../src/TaskolotlStateRetriever";
const { execSync } = require('child_process');
import { TaskolotlState } from "../../src/TaskolotlState";
import { TaskolotlStateUpdater } from "../../src/TaskolotlStateUpdater";
import * as sqlite3 from 'sqlite3';

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

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
        const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", 0]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test 1 3 1', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-2", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-3", false);

    const a = new TaskolotlStateRetriever();

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", 0], ["Test-Habit-2", 0], ["Test-Habit-3", 0]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test 2 2 1', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Test-Category-2", 0, 0, 0);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-2", false);
    await addEntry("2023-6-24", "Test-Category-2", "Test-Habit-1", false);
    await addEntry("2023-6-24", "Test-Category-2", "Test-Habit-2", false);

    const a = new TaskolotlStateRetriever();

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", 0], ["Test-Habit-2", 0]]}, {"average": 0, "categoryName": "Test-Category-2", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", 0], ["Test-Habit-2", 0]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test 1 1 2', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-23", "Test-Category-1", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-1", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);

    const a = new TaskolotlStateRetriever();

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": 0, "score": 0, "taskData": [["Test-Habit-1", 0]]}], "scoringData": {"average": 0, "previousAverage": 0, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test 1 4 2', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-23", "Test-Category-1", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-1", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);
    await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-2", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-2", false);
    await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-3", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-3", false);
    await addEntry("2023-6-23", "Test-Category-1", "Test-Habit-4", false);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-4", false);

    const a = new TaskolotlStateRetriever();

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": 0, "score": 0, "taskData": [["Test-Habit-1", 0], ["Test-Habit-2", 0], ["Test-Habit-3", 0], 
      ["Test-Habit-4", 0]]}], "scoringData": {"average": 0, "previousAverage": 0, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test updateEntry', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);

    const a = new TaskolotlStateRetriever();
    const b = new TaskolotlStateUpdater();

    const jsonString = '[{"score":0,"average":0,"previousAverage":-1,"categoryName":"Test-Category-1","taskData":[["Test-Habit-1",true]]}]'

    await b.updateEntry(true, "2023-6-24", "Test-Category-1", "Test-Habit-1");

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", 1]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test setCategoryScore', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);

    const a = new TaskolotlStateRetriever();
    const b = new TaskolotlStateUpdater();

    const jsonString = '[{"score":0,"average":0,"previousAverage":-1,"categoryName":"Test-Category-1","taskData":[["Test-Habit-1",true]]}]'

    await b.updateEntry(true, "2023-6-24", "Test-Category-1", "Test-Habit-1");
    await b.setCategoryScore("Test-Category-1", "2023-6-24", 1);

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: TaskolotlState = {"categoryData": [{"average": 1, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 1, "taskData": [["Test-Habit-1", 1]]}], "scoringData": {"average": 1, "previousAverage": -1, "score": 1}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test updateEntryFinished', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-24", "Test-Category-1", 0, 0, 0);
    await addEntry("2023-6-24", "Test-Category-1", "Test-Habit-1", false);

    const a = new TaskolotlStateRetriever();
    const b = new TaskolotlStateUpdater();

    const jsonString = '[{"score":0,"average":0,"previousAverage":-1,"categoryName":"Test-Category-1","taskData":[["Test-Habit-1",true]]}]'
    const entry: [string, boolean][] = [
      ["Test-Habit-1", true]
    ];

    await b.updateEntryFinished(entry, "Test-Category-1", "2023-6-24");

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: TaskolotlState = {"categoryData": [{"average": 0, "categoryName": "Test-Category-1", "previousAverage": -1, "score": 0, "taskData": [["Test-Habit-1", 1]]}], "scoringData": {"average": 0, "previousAverage": -1, "score": 0}};

      expect(response).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test updateTaskolotlState', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-24", "Faith", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Current Relationships", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Diet", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Studying", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Atlas", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Housework", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Gamedev", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Webdev", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Hygiene", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Exercise", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Wakeup", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Galatians", 0, 0, 0);
    await addEntryToCategoryTable("2023-6-24", "Work", 0, 0, 0);

    await addEntry("2023-6-24", "Faith", "Pray", false);
    await addEntry("2023-6-24", "Faith", "Truly and honestly seek God", false);
    await addEntry("2023-6-24", "Faith", "NF", false);
    await addEntry("2023-6-24", "Faith", "No swearing", false);
    await addEntry("2023-6-24", "Faith", "Read scripture", false);
    await addEntry("2023-6-24", "Faith", "Do not read scans you did not pay for", false);

    await addEntry("2023-6-24", "Current Relationships", "Mom", false);
    await addEntry("2023-6-24", "Current Relationships", "Dad", false);
    await addEntry("2023-6-24", "Current Relationships", "Charlie", false);
    await addEntry("2023-6-24", "Current Relationships", "Ryan", false);
    await addEntry("2023-6-24", "Current Relationships", "Max", false);
    await addEntry("2023-6-24", "Current Relationships", "Joey", false);

    await addEntry("2023-6-24", "Diet", "Get enough fruit", false);
    await addEntry("2023-6-24", "Diet", "Get enough veggies", false);
    await addEntry("2023-6-24", "Diet", "Get enough protein", false);
    await addEntry("2023-6-24", "Diet", "Get enough carbs", false);
    await addEntry("2023-6-24", "Diet", "Get enough water", false);

    await addEntry("2023-6-24", "Studying", "One unit study gamedev", false);
    await addEntry("2023-6-24", "Studying", "One unit study webdev frontend", false);
    await addEntry("2023-6-24", "Studying", "One unit study backend", false);
    await addEntry("2023-6-24", "Studying", "One unit study UI UX", false);
    await addEntry("2023-6-24", "Studying", "One unit study Project Management", false);
    await addEntry("2023-6-24", "Studying", "One unit study C++", false);
    await addEntry("2023-6-24", "Studying", "One unit study Java", false);
    await addEntry("2023-6-24", "Studying", "One unit study Typescript", false);
    await addEntry("2023-6-24", "Studying", "One unit study Security", false);
    await addEntry("2023-6-24", "Studying", "One unit study cooking", false);

    await addEntry("2023-6-24", "Atlas", "15 minutes play", false);
    await addEntry("2023-6-24", "Atlas", "15 minutes pets", false);
    await addEntry("2023-6-24", "Atlas", "Greenies", false);
    await addEntry("2023-6-24", "Atlas", "Proper Diet", false);
    await addEntry("2023-6-24", "Atlas", "Clean water", false);
    await addEntry("2023-6-24", "Atlas", "Litter box", false);

    await addEntry("2023-6-24", "Housework", "One unit living room trash pickup", false);
    await addEntry("2023-6-24", "Housework", "One unit living room vacuum", false);
    await addEntry("2023-6-24", "Housework", "One unit living room clutter", false);
    await addEntry("2023-6-24", "Housework", "One unit living room laundry pickup", false);
    await addEntry("2023-6-24", "Housework", "Clean bathroom sink", false);
    await addEntry("2023-6-24", "Housework", "Clean bathroom mirror", false);
    await addEntry("2023-6-24", "Housework", "Clean tub if it needs cleaning", false);
    await addEntry("2023-6-24", "Housework", "Clean shower walls if needed", false);
    await addEntry("2023-6-24", "Housework", "Wash bathroom floor if needed", false);
    await addEntry("2023-6-24", "Housework", "Clean fridge if needed", false);
    await addEntry("2023-6-24", "Housework", "One unit kitchen trash", false);
    await addEntry("2023-6-24", "Housework", "Dishes completely done", false);
    await addEntry("2023-6-24", "Housework", "One unit wash counters and sink", false);
    await addEntry("2023-6-24", "Housework", "Wash stove if needed", false);
    await addEntry("2023-6-24", "Housework", "Clean kitchen floor if needed", false);
    await addEntry("2023-6-24", "Housework", "One unit kitchen clutter", false);
    await addEntry("2023-6-24", "Housework", "Do a load of laundry if there is enough", false);
    await addEntry("2023-6-24", "Housework", "One unit vacuum office", false);
    await addEntry("2023-6-24", "Housework", "One unit office clutter", false);
    await addEntry("2023-6-24", "Housework", "One unit office trash", false);
    await addEntry("2023-6-24", "Housework", "Clean litter boxes", false);
    await addEntry("2023-6-24", "Housework", "Take out trash if its full", false);
    await addEntry("2023-6-24", "Housework", "One unit vacuum dining room", false);
    await addEntry("2023-6-24", "Housework", "One unit trash dining room", false);
    await addEntry("2023-6-24", "Housework", "One unit clutter dining room", false);
    await addEntry("2023-6-24", "Housework", "Shred junk mail", false);
    await addEntry("2023-6-24", "Housework", "Get mail", false);
    await addEntry("2023-6-24", "Housework", "One unit vacuum hallway", false);

    await addEntry("2023-6-24", "Gamedev", "One unit gamedev", false);

    await addEntry("2023-6-24", "Webdev", "One unit webdev", false);

    await addEntry("2023-6-24", "Hygiene", "Dental trio one", false);
    await addEntry("2023-6-24", "Hygiene", "Dental trio two", false);
    await addEntry("2023-6-24", "Hygiene", "Shower", false);
    await addEntry("2023-6-24", "Hygiene", "Wash face one", false);
    await addEntry("2023-6-24", "Hygiene", "Moisturize one", false);
    await addEntry("2023-6-24", "Hygiene", "Moisturize two", false);
    await addEntry("2023-6-24", "Hygiene", "Wash face two", false);
    await addEntry("2023-6-24", "Hygiene", "Zits + acne patches", false);
    await addEntry("2023-6-24", "Hygiene", "Shave", false);
    await addEntry("2023-6-24", "Hygiene", "New pillowcase", false);

    await addEntry("2023-6-24", "Exercise", "Exercise", false);

    await addEntry("2023-6-24", "Wakeup", "Wake up at 6AM. Get right out of bed", false);

    await addEntry("2023-6-24", "Galatians", "Find a moment to be patient", false);
    await addEntry("2023-6-24", "Galatians", "Find a moment to be kind", false);
    await addEntry("2023-6-24", "Galatians", "Find a moment to be humble", false);
    await addEntry("2023-6-24", "Galatians", "Find a moment to be generous", false);
    await addEntry("2023-6-24", "Galatians", "Find a moment to hold back from anger", false);

    await addEntry("2023-6-24", "Work", "5 hours of concentrated work", false);

    const a = new TaskolotlStateRetriever();
    const b = new TaskolotlStateUpdater();

    const jsonString = '[{"score":0,"average":0,"previousAverage":-1,"categoryName":"Test-Category-1","taskData":[["Test-Habit-1",true]]}]'
    const entry: [string, boolean][] = [
      ["Test-Habit-1", true]
    ];


    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResult: string = '{"scoringData":{"score":0,"average":0,"previousAverage":-1},"categoryData":[{"score":null,"average":null,"previousAverage":-1,"categoryName":"Test-Category-1","taskData":[["Test-Habit-1",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Faith","taskData":[["NF",0],["No swearing",0],["Do not read scans you did not pay for",0],["Read scripture",0],["Truly and honestly seek God",0],["Pray",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Current Relationships","taskData":[["Mom",0],["Dad",0],["Charlie",0],["Ryan",0],["Max",0],["Joey",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Diet","taskData":[["Get enough fruit",0],["Get enough veggies",0],["Get enough protein",0],["Get enough water",0],["Get enough carbs",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Studying","taskData":[["One unit study gamedev",0],["One unit study backend",0],["One unit study webdev frontend",0],["One unit study UI UX",0],["One unit study Project Management",0],["One unit study C++",0],["One unit study Security",0],["One unit study cooking",0],["One unit study Java",0],["One unit study Typescript",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Atlas","taskData":[["15 minutes play",0],["15 minutes pets",0],["Greenies",0],["Proper Diet",0],["Clean water",0],["Litter box",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Housework","taskData":[["One unit living room trash pickup",0],["One unit living room vacuum",0],["One unit living room clutter",0],["One unit living room laundry pickup",0],["Clean bathroom sink",0],["Clean bathroom mirror",0],["Clean tub if it needs cleaning",0],["Clean shower walls if needed",0],["Wash bathroom floor if needed",0],["Clean fridge if needed",0],["One unit kitchen trash",0],["Dishes completely done",0],["One unit wash counters and sink",0],["Wash stove if needed",0],["One unit kitchen clutter",0],["Clean kitchen floor if needed",0],["Do a load of laundry if there is enough",0],["One unit vacuum office",0],["One unit office clutter",0],["One unit office trash",0],["Clean litter boxes",0],["Take out trash if its full",0],["One unit vacuum dining room",0],["One unit trash dining room",0],["One unit clutter dining room",0],["Shred junk mail",0],["One unit vacuum hallway",0],["Get mail",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Gamedev","taskData":[["One unit gamedev",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Webdev","taskData":[["One unit webdev",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Hygiene","taskData":[["Dental trio one",0],["Dental trio two",0],["Wash face one",0],["Moisturize two",0],["Moisturize one",0],["Shower",0],["Wash face two",0],["Zits + acne patches",0],["Shave",0],["New pillowcase",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Exercise","taskData":[["Exercise",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Wakeup","taskData":[["Wake up at 6AM. Get right out of bed",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Galatians","taskData":[["Find a moment to be patient",0],["Find a moment to be kind",0],["Find a moment to be generous",0],["Find a moment to be humble",0],["Find a moment to hold back from anger",0]]},{"score":0,"average":0,"previousAverage":-1,"categoryName":"Work","taskData":[["5 hours of concentrated work",0]]}]}';

      expect(JSON.stringify(response)).toEqual(expectedResult);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });

  test('Test prod', async () => {
    runCommand('del mydatabase.db');
    runCommand('node ../createDB.js');
    
    await addEntryToCategoryTable("2023-6-24", "Faith", 0, 0, 0);
    await addEntry("2023-6-24", "Faith", "Pray", false);

    const a = new TaskolotlStateRetriever();

    await a.getTaskolotlState("2023-6-24").then((response: TaskolotlState) => {
      const expectedResultJSON: string = '{"scoringData":{"score":0,"average":0,"previousAverage":-1},"categoryData":[{"score":0,"average":0,"previousAverage":-1,"categoryName":"Faith","taskData":[["Pray",0]]}]}'
      expect(JSON.stringify(response)).toEqual(expectedResultJSON);
    })
    .catch((err: Error) => {
        console.log(err);
        expect(err).toBeUndefined();
    });
  });
});