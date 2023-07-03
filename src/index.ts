import * as express from "express";
import * as sqlite3 from 'sqlite3';
import * as bodyParser from 'body-parser';
import * as schedule from 'node-schedule';

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
    const db = new sqlite3.Database(databaseName);

    // Select entries from the table with the given datetime
    const query = `SELECT * FROM entries WHERE datetime = ?`;
    db.all(query, [date], (err, rows: Entry[]) => {
      if (err) {
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
    taskCategory.taskData.forEach(([task, status]) => {
    });
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

  function calculateAverageFinished(datetime: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
    
        const query = `
          SELECT AVG(averageScore) as overallAverageScore
          FROM (
            SELECT datetime, AVG(score) as averageScore
            FROM CategoryTable
            GROUP BY datetime
          )`;
    
        db.get(query, [], (err: Error | null, row: any) => {
          if (err) {
            reject(err);
          } else {
            const overallAverageScore = row && row.overallAverageScore !== null ? row.overallAverageScore : -1;
            resolve(overallAverageScore);
          }
    
          db.close();
        });
      });
  }

  function calculateAverageFinishedForNonCurrentDate(datetime: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
    
        const query = `
          SELECT AVG(averageScore) as overallAverageScore
          FROM (
            SELECT datetime, AVG(score) as averageScore
            FROM CategoryTable
            WHERE datetime != ?
            GROUP BY datetime
          )`;
    
        db.get(query, [datetime], (err: Error | null, row: any) => {
          if (err) {
            reject(err);
          } else {
            const overallAverageScore = row && row.overallAverageScore !== null ? row.overallAverageScore : -1;
            resolve(overallAverageScore);
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

  function getScoreByDatetimeAndCategory(datetime: string, category: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
  
      const query = `SELECT score FROM CategoryTable WHERE datetime = ? AND category = ?`;
  
      db.get(query, [datetime, category], (err: Error | null, row: any) => {
        if (err) {
          reject(err);
        } else {
          const score = row ? row.score : null;
          resolve(score);
        }
  
        db.close();
      });
    });
  }

  function getAverageScoreByDatetimeAndCategory(datetime: string, category: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
  
      const query = `SELECT AVG(score) as averageScore FROM CategoryTable WHERE datetime = ? AND category = ?`;
  
      db.get(query, [datetime, category], (err: Error | null, row: any) => {
        if (err) {
          reject(err);
        } else {
          const averageScore = row ? row.averageScore : null;
          resolve(averageScore);
        }
  
        db.close();
      });
    });
  }

  function getAverageScoreByCategoryWithoutDatetime(category: string, datetime: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
  
      const query = `
        SELECT AVG(score) as averageScore
        FROM CategoryTable
        WHERE category = ? AND datetime != ?`;
  
      db.get(query, [category, datetime], (err: Error | null, row: any) => {
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

const app = express();
const port = 3000;

app.use(express.static("assets"));
app.use(express.static("client/dist"));

app.get('/', (req, res) => {
    res.sendFile("homepage.html", {root: "./assets"});
})

// GET request route handler
app.get('/api/data', (req, res) => {

    const currentDate = getCurrentDate();

    getSumOfFinishedValues(currentDate)
        .then((sum) => {
            calculateAverageFinished(currentDate)
                .then((avg) => {
                    calculateAverageFinishedForNonCurrentDate(currentDate)
                        .then((pvavg) => {
                            getEntriesGroupedByCategory(currentDate)
                                .then((entriesByCategory) => {
                                    const data: {
                                        score: number;
                                        average: number;
                                        previousAverage: number;
                                        categoryData: {
                                            categoryName: string;
                                            taskData: [string, boolean][];
                                            score: number;
                                            average: number;
                                            previousAverage: number;
                                        }[];
                                    } = {
                                        score: sum,
                                        average: avg,
                                        previousAverage: pvavg,
                                        categoryData: [],
                                    };

                                    const promises: Promise<void>[] = [];

                                    entriesByCategory.forEach((entries, category) => {
                                        const stringData = category;

                                        const pairData: [string, boolean][] = [];

                                        entries.forEach((entry) => {
                                            pairData.push([entry.name, entry.finished]);
                                        });

                                        const bundle: {
                                            categoryName: string;
                                            taskData: [string, boolean][];
                                            score: number;
                                            average: number;
                                            previousAverage: number;
                                        } = {
                                            categoryName: stringData,
                                            taskData: pairData,
                                            score: 0,
                                            average: 0,
                                            previousAverage: 0,
                                        };

                                        const sPromise = getScoreByDatetimeAndCategory(currentDate, category)
                                            .then((s) => {
                                                bundle.score = s;
                                            });

                                        const avgPromise = getAverageScoreByDatetimeAndCategory(currentDate, category)
                                            .then((averageScore) => {
                                                bundle.average = averageScore;
                                            });

                                        const pvavgPromise = getAverageScoreByCategoryWithoutDatetime(category, currentDate)
                                            .then((pvavg) => {
                                                bundle.previousAverage = pvavg;
                                            });

                                        promises.push(sPromise, avgPromise, pvavgPromise);
                                        data.categoryData.push(bundle);
                                    });

                                    Promise.all(promises)
                                        .then(() => {
                                            res.json(data);
                                        })
                                        .catch((err: Error) => {
                                            res.status(500).json({ error: 'An error occurred while retrieving data.' });
                                        });
                                })
                                .catch((err: Error) => {
                                    res.status(500).json({ error: 'An error occurred while querying the database.' });
                                });
                        })
                        .catch((error) => {
                            res.status(500).json({ error: 'An error occurred while retrieving entries.' });
                        });
                })
                .catch((err) => {
                    res.status(500).json({ error: 'An error occurred while querying the database.' });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: 'An error occurred while querying the database.' });
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
    addEntryToCategoryTable(getCurrentDate(), "Faith", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Current Relationships", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Diet", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Studying", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Atlas", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Housework", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Gamedev", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Webdev", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Hygiene", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Exercise", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Wakeup", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Galatians", 0, 0, 0);
    addEntryToCategoryTable(getCurrentDate(), "Work", 0, 0, 0);


    addEntry(getCurrentDate(), "Faith", "Pray", false);
    addEntry(getCurrentDate(), "Faith", "Truly and honestly seek God", false);
    addEntry(getCurrentDate(), "Faith", "NF", false);
    addEntry(getCurrentDate(), "Faith", "No swearing", false);
    addEntry(getCurrentDate(), "Faith", "Read scripture", false);
    addEntry(getCurrentDate(), "Faith", "Don't read scans you didn't pay for", false);
    
    addEntry(getCurrentDate(), "Current Relationships", "Mom", false);
    addEntry(getCurrentDate(), "Current Relationships", "Dad", false);
    addEntry(getCurrentDate(), "Current Relationships", "Charlie", false);
    addEntry(getCurrentDate(), "Current Relationships", "Ryan", false);
    addEntry(getCurrentDate(), "Current Relationships", "Max", false);
    addEntry(getCurrentDate(), "Current Relationships", "Joey", false);
    
    addEntry(getCurrentDate(), "Diet", "Get enough fruit", false);
    addEntry(getCurrentDate(), "Diet", "Get enough veggies", false);
    addEntry(getCurrentDate(), "Diet", "Get enough protein", false);
    addEntry(getCurrentDate(), "Diet", "Get enough carbs", false);
    addEntry(getCurrentDate(), "Diet", "Get enough water", false);
    
    addEntry(getCurrentDate(), "Studying", "One unit study gamedev", false);
    addEntry(getCurrentDate(), "Studying", "One unit study webdev frontend", false);
    addEntry(getCurrentDate(), "Studying", "One unit study backend", false);
    addEntry(getCurrentDate(), "Studying", "One unit study Japanese", false);
    addEntry(getCurrentDate(), "Studying", "One unit study cooking", false);
    
    addEntry(getCurrentDate(), "Atlas", "15 minutes play", false);
    addEntry(getCurrentDate(), "Atlas", "15 minutes pets", false);
    addEntry(getCurrentDate(), "Atlas", "Greenies", false);
    addEntry(getCurrentDate(), "Atlas", "Proper Diet", false);
    addEntry(getCurrentDate(), "Atlas", "Clean water", false);
    addEntry(getCurrentDate(), "Atlas", "Litter box", false);
    
    addEntry(getCurrentDate(), "Housework", "One unit dishes", false);
    addEntry(getCurrentDate(), "Housework", "One unit garbage", false);
    addEntry(getCurrentDate(), "Housework", "One unit laundry", false);
    addEntry(getCurrentDate(), "Housework", "One unit housecleaning", false);
    addEntry(getCurrentDate(), "Housework", "One unit clutter", false);
    addEntry(getCurrentDate(), "Housework", "Get the mail", false);
    addEntry(getCurrentDate(), "Housework", "One unit shredding", false);
    addEntry(getCurrentDate(), "Housework", "Food prepped for the next day", false);
    addEntry(getCurrentDate(), "Housework", "Wash any dishes I dirtied", false);
    
    addEntry(getCurrentDate(), "Gamedev", "One unit gamedev", false);
    
    addEntry(getCurrentDate(), "Webdev", "One unit webdev", false);
    
    addEntry(getCurrentDate(), "Hygiene", "Dental trio one", false);
    addEntry(getCurrentDate(), "Hygiene", "Dental trio two", false);
    addEntry(getCurrentDate(), "Hygiene", "Shower", false);
    addEntry(getCurrentDate(), "Hygiene", "Wash face one", false);
    addEntry(getCurrentDate(), "Hygiene", "Moisturize one", false);
    addEntry(getCurrentDate(), "Hygiene", "Moisturize two", false);
    addEntry(getCurrentDate(), "Hygiene", "Wash face two", false);
    addEntry(getCurrentDate(), "Hygiene", "Zits + acne patches", false);
    addEntry(getCurrentDate(), "Hygiene", "Shave", false);
    addEntry(getCurrentDate(), "Hygiene", "New pillowcase", false);

    addEntry(getCurrentDate(), "Exercise", "Exercise", false);

    addEntry(getCurrentDate(), "Wakeup", "Wake up at 6AM. Get right out of bed", false);

    addEntry(getCurrentDate(), "Galatians", "Find a moment to be patient", false);
    addEntry(getCurrentDate(), "Galatians", "Find a moment to be kind", false);
    addEntry(getCurrentDate(), "Galatians", "Find a moment to be humble", false);
    addEntry(getCurrentDate(), "Galatians", "Find a moment to be generous", false);
    addEntry(getCurrentDate(), "Galatians", "Find a moment to hold back from anger", false);

    addEntry(getCurrentDate(), "Work", "6 hours of concentrated work", false);
  };
  
// Schedule the task to run every night at 12:05 AM
const job = schedule.scheduleJob('5 0 * * *', midnightTask);
