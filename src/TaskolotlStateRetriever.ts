import { CurrentDateRetriever } from "./CurrentDateRetriever";
import { GlobalScoringData } from "./GlobalScoringData"
import { CategoryData } from "./CategoryData"
import { Entry } from "./Entry"
import { TaskolotlState } from "./TaskolotlState"

import * as sqlite3 from 'sqlite3';

export class TaskolotlStateRetriever {
    constructor() {
    }

    public getTaskolotlState(currentDate: string): Promise<TaskolotlState> {
        return new Promise((resolve, reject) => {
            const databaseName = 'mydatabase.db';

            this.getGlobalScoringData(currentDate, databaseName).then((globalScoringData) => {
              this.getCategoryData(currentDate, databaseName).then((cData) => {
                const data: TaskolotlState = {
                    scoringData: globalScoringData,
                    categoryData: cData,
                };
        
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    private getGlobalScoringData(currentDate: string, databaseName: string): Promise<GlobalScoringData> {
        return new Promise((resolve, reject) => {
          this.getSumOfFinishedValues(currentDate, databaseName).then((sum) => {
            this.calculateAverageFinished(currentDate, databaseName).then((avg) => {
              this.calculateAverageFinishedForNonCurrentDate(currentDate, databaseName).then((pvavg) => {
                const globalScoringData = {
                  score: sum,
                  average: avg,
                  previousAverage: pvavg
                };
      
                resolve(globalScoringData)
              })
              .catch((err) => {
                reject(err);
              });
            })
            .catch((err) => {
              reject(err);
            });
          })
          .catch((err) => {
            reject(err);
          });
        });
    }

    private getSumOfFinishedValues(datetime: string, databaseName: string): Promise<number> {
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

    private calculateAverageFinished(datetime: string, databaseName: string): Promise<number> {
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

    private calculateAverageFinishedForNonCurrentDate(datetime: string, databaseName: string): Promise<number> {
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

    private getCategoryData(currentDate: string, databaseName: string): Promise<CategoryData[]> {
        return new Promise((resolve, reject) => {
          this.getEntriesForCurrentDate(currentDate, databaseName).then((entries) => {
            const entriesGroupedByCategory = this.groupEntriesByCategory(entries);
    
            const promises: Promise<void>[] = [];
            const categoryData: CategoryData[] = [];
    
            entriesGroupedByCategory.forEach((entries, category) => {
              const stringData = category;
              const pairData: [string, boolean][] = [];
    
              const data: CategoryData = {
                score: -1,
                average: -1,
                previousAverage: -1,
                categoryName: category,
                taskData: pairData
              };
    
              entries.forEach((entry) => {
                  if (typeof entry.finished === 'number') {
                    entry.finished = entry.finished === 1 ? true : false;
                  }

                  pairData.push([entry.name, entry.finished]);
              });
    
              const sPromise = this.getScoreByDatetimeAndCategory(currentDate, category, databaseName)
                  .then((s) => {
                      data.score = s;
                  });
    
              const avgPromise = this.getAverageScoreByDatetimeAndCategory(currentDate, category, databaseName)
                  .then((averageScore) => {
                      data.average = averageScore;
                  });
    
              const pvavgPromise = this.getAverageScoreByCategoryWithoutDatetime(category, currentDate, databaseName)
                  .then((pvavg) => {
                      data.previousAverage = pvavg;
                  });
    
              promises.push(sPromise, avgPromise, pvavgPromise);
              categoryData.push(data);
            });
    
            Promise.all(promises)
            .then(() => {
                resolve(categoryData);
            })
            .catch((err: Error) => {
                reject(err);
            });
    
          })
          .catch((err) => {
            reject(err);
          });
        });
    }

    private getEntriesForCurrentDate(currentDate: string, databaseName: string): Promise<Entry[]> {
        return new Promise((resolve, reject) => {
          const db = new sqlite3.Database(databaseName);
    
          // Select entries from the table with the given datetime
          const query = `SELECT * FROM entries WHERE datetime = ?`;
          db.all(query, [currentDate], (err, rows: Entry[]) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
      
            // Close the database connection
            db.close();
          });
        });
    }

    private groupEntriesByCategory(entries: Entry[]): Map<string, Entry[]> {
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

    private getScoreByDatetimeAndCategory(datetime: string, category: string, databaseName: string): Promise<number> {
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

    private getAverageScoreByDatetimeAndCategory(datetime: string, category: string, databaseName: string): Promise<number> {
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

    private getAverageScoreByCategoryWithoutDatetime(category: string, datetime: string, databaseName: string): Promise<number> {
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
}