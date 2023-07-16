import * as sqlite3 from 'sqlite3';
import { finished } from 'stream';

interface TaskCategory {
    categoryName: string;
    taskData: [string, boolean][];
}

export class TaskolotlStateUpdater {
    constructor() {
    }

    public updateEntry(finished: boolean, currentDate: string, categoryName: string, taskName: string): Promise<void> {
        return new Promise((resolve, reject) => {
          const databaseName = 'mydatabase.db';

          const db = new sqlite3.Database(databaseName);

            const query = 'UPDATE entries SET finished = ? WHERE datetime = ? AND category = ? AND name = ?';
            const finishedValue = finished ? 1 : 0;

            db.run(query, [finishedValue, currentDate, categoryName, taskName], function (err: Error | null) {
              if (err) {
                  reject(err);
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

    public async updateEntryFinished(taskData: [string, boolean][], categoryName: string, currentDate: string): Promise<void> {
        for (const entry of taskData) {
          await this.updateEntry(entry[1], currentDate, categoryName, entry[0]);
        }
    }

      public setCategoryScore(categoryName: string, datetime: string, score: number): Promise<void> {
        const databaseName = 'mydatabase.db';

        return new Promise((resolve, reject) => {
          const db = new sqlite3.Database(databaseName); // Replace with your SQLite database file
      
          const query = `UPDATE CategoryTable SET score = ? WHERE category = ? AND datetime = ?`;
      
          db.run(query, [score, categoryName, datetime], function (err: Error | null) {
            if (err) {
                reject(err);
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

    public async updateTaskolotlState(jsonString: string, currentDate: string): Promise<number> {
    
        // Step 2: Parse the JSON string into a JavaScript object
        const taskCategories: TaskCategory[] = JSON.parse(jsonString);
    
        for (const category of taskCategories) {
          await this.updateEntryFinished(category.taskData, category.categoryName, currentDate);
          const { categoryName, taskData } = category;
          const parsedTaskData: [string, boolean][] = taskData.map(([task, status]) => [task, Boolean(status)]);
  
          const trueCount = parsedTaskData.reduce((count, [, status]) => count + Number(status), 0);
          const totalCount = parsedTaskData.length;
          const averageTrueCount = totalCount > 0 ? trueCount / totalCount : 0;
  
          await this.setCategoryScore(category.categoryName, currentDate, averageTrueCount);
        }
  
        return 200;
    }
}