"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskolotlStateRetriever = void 0;
const sqlite3 = require("sqlite3");
class TaskolotlStateRetriever {
    constructor() {
    }
    getTaskolotlState(currentDate) {
        return new Promise((resolve, reject) => {
            const databaseName = 'mydatabase.db';
            this.getGlobalScoringData(currentDate, databaseName).then((globalScoringData) => {
                this.getCategoryData(currentDate, databaseName).then((cData) => {
                    const data = {
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
    getGlobalScoringData(currentDate, databaseName) {
        return new Promise((resolve, reject) => {
            this.getSumOfFinishedValues(currentDate, databaseName).then((sum) => {
                this.calculateAverageFinished(currentDate, databaseName).then((avg) => {
                    this.calculateAverageFinishedForNonCurrentDate(currentDate, databaseName).then((pvavg) => {
                        const globalScoringData = {
                            score: sum,
                            average: avg,
                            previousAverage: pvavg
                        };
                        resolve(globalScoringData);
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
    getSumOfFinishedValues(datetime, databaseName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
            const query = `
              SELECT AVG(score) as averageScore
              FROM CategoryTable
              WHERE datetime = ?`;
            db.get(query, [datetime], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    const averageScore = row && row.averageScore !== null ? row.averageScore : -1;
                    resolve(averageScore);
                }
                db.close();
            });
        });
    }
    calculateAverageFinished(datetime, databaseName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
            const query = `
              SELECT AVG(averageScore) as overallAverageScore
              FROM (
                SELECT datetime, AVG(score) as averageScore
                FROM CategoryTable
                GROUP BY datetime
              )`;
            db.get(query, [], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    const overallAverageScore = row && row.overallAverageScore !== null ? row.overallAverageScore : -1;
                    resolve(overallAverageScore);
                }
                db.close();
            });
        });
    }
    calculateAverageFinishedForNonCurrentDate(datetime, databaseName) {
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
            db.get(query, [datetime], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    const overallAverageScore = row && row.overallAverageScore !== null ? row.overallAverageScore : -1;
                    resolve(overallAverageScore);
                }
                db.close();
            });
        });
    }
    getCategoryData(currentDate, databaseName) {
        return new Promise((resolve, reject) => {
            this.getEntriesForCurrentDate(currentDate, databaseName).then((entries) => {
                const entriesGroupedByCategory = this.groupEntriesByCategory(entries);
                const promises = [];
                const categoryData = [];
                entriesGroupedByCategory.forEach((entries, category) => {
                    const stringData = category;
                    const pairData = [];
                    const data = {
                        score: -1,
                        average: -1,
                        previousAverage: -1,
                        categoryName: category,
                        taskData: pairData
                    };
                    entries.forEach((entry) => {
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
                    .catch((err) => {
                    reject(err);
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    getEntriesForCurrentDate(currentDate, databaseName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(databaseName);
            // Select entries from the table with the given datetime
            const query = `SELECT * FROM entries WHERE datetime = ?`;
            db.all(query, [currentDate], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
                // Close the database connection
                db.close();
            });
        });
    }
    groupEntriesByCategory(entries) {
        const entriesByCategory = new Map();
        entries.forEach((entry) => {
            const { category } = entry;
            if (entriesByCategory.has(category)) {
                entriesByCategory.get(category).push(entry);
            }
            else {
                entriesByCategory.set(category, [entry]);
            }
        });
        return entriesByCategory;
    }
    getScoreByDatetimeAndCategory(datetime, category, databaseName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
            const query = `SELECT score FROM CategoryTable WHERE datetime = ? AND category = ?`;
            db.get(query, [datetime, category], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    const score = row ? row.score : null;
                    resolve(score);
                }
                db.close();
            });
        });
    }
    getAverageScoreByDatetimeAndCategory(datetime, category, databaseName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
            const query = `SELECT AVG(score) as averageScore FROM CategoryTable WHERE datetime = ? AND category = ?`;
            db.get(query, [datetime, category], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    const averageScore = row ? row.averageScore : null;
                    resolve(averageScore);
                }
                db.close();
            });
        });
    }
    getAverageScoreByCategoryWithoutDatetime(category, datetime, databaseName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
            const query = `
            SELECT AVG(score) as averageScore
            FROM CategoryTable
            WHERE category = ? AND datetime != ?`;
            db.get(query, [category, datetime], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    const averageScore = row && row.averageScore !== null ? row.averageScore : -1;
                    resolve(averageScore);
                }
                db.close();
            });
        });
    }
}
exports.TaskolotlStateRetriever = TaskolotlStateRetriever;
//# sourceMappingURL=TaskolotlStateRetriever.js.map