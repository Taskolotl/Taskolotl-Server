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
exports.TaskolotlStateUpdater = void 0;
const sqlite3 = require("sqlite3");
class TaskolotlStateUpdater {
    constructor() {
    }
    updateEntry(finished, currentDate, categoryName, taskName) {
        return new Promise((resolve, reject) => {
            const databaseName = 'mydatabase.db';
            const db = new sqlite3.Database(databaseName);
            const query = 'UPDATE entries SET finished = ? WHERE datetime = ? AND category = ? AND name = ?';
            const finishedValue = finished ? 1 : 0;
            db.run(query, [finishedValue, currentDate, categoryName, taskName], function (err) {
                if (err) {
                    reject(err);
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
    updateEntryFinished(taskData, categoryName, currentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const entry of taskData) {
                yield this.updateEntry(entry[1], currentDate, categoryName, entry[0]);
            }
        });
    }
    setCategoryScore(categoryName, datetime, score) {
        const databaseName = 'mydatabase.db';
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
            const query = `UPDATE CategoryTable SET score = ? WHERE category = ? AND datetime = ?`;
            db.run(query, [score, categoryName, datetime], function (err) {
                if (err) {
                    reject(err);
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
    updateTaskolotlState(jsonString, currentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            // Step 2: Parse the JSON string into a JavaScript object
            const taskCategories = JSON.parse(jsonString);
            for (const category of taskCategories) {
                yield this.updateEntryFinished(category.taskData, category.categoryName, currentDate);
                const { categoryName, taskData } = category;
                const parsedTaskData = taskData.map(([task, status]) => [task, Boolean(status)]);
                const trueCount = parsedTaskData.reduce((count, [, status]) => count + Number(status), 0);
                const totalCount = parsedTaskData.length;
                const averageTrueCount = totalCount > 0 ? trueCount / totalCount : 0;
                yield this.setCategoryScore(category.categoryName, currentDate, averageTrueCount);
            }
            return 200;
        });
    }
}
exports.TaskolotlStateUpdater = TaskolotlStateUpdater;
//# sourceMappingURL=TaskolotlStateUpdater.js.map