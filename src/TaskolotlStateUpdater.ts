import * as sqlite3 from 'sqlite3';

interface TaskCategory {
    categoryName: string;
    taskData: [string, boolean][];
}

export class TaskolotlStateUpdater {
    constructor() {
        console.log("HELLO TaskolotlStateUpdater");
    }

    private updateEntry(db: sqlite3.Database, finished: boolean, currentDate: string, taskCategory: TaskCategory, taskName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE entries SET finished = ? WHERE datetime = ? AND category = ? AND name = ?';
            const finishedValue = finished ? 1 : 0;

            db.run(query, [finishedValue, currentDate, taskCategory.categoryName, taskName], function (err: Error | null) {
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

    private updateEntryFinished(taskCategory: TaskCategory, currentDate: string): void {
        const databaseName = 'mydatabase.db';

        const db = new sqlite3.Database(databaseName);
    
        taskCategory.taskData.forEach(([taskName, finished]) => {
          // Prepare the SQL statement
            this.updateEntry(db, finished, currentDate, taskCategory, taskName)
        });
    }

      private setCategoryScore(categoryName: string, datetime: string, score: number): Promise<void> {
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

    public updateTaskolotlState(jsonString: string, currentDate: string): number {
    
        // Step 2: Parse the JSON string into a JavaScript object
        const taskCategories: TaskCategory[] = JSON.parse(jsonString);
    
        // Step 3: Iterate over the array and create TaskCategory instances
        const parsedTaskCategories: TaskCategory[] = taskCategories.map(category => {
          this.updateEntryFinished(category, currentDate);
          const { categoryName, taskData } = category;
          const parsedTaskData: [string, boolean][] = taskData.map(([task, status]) => [task, Boolean(status)]);
  
          const trueCount = parsedTaskData.reduce((count, [, status]) => count + Number(status), 0);
          const totalCount = parsedTaskData.length;
          const averageTrueCount = totalCount > 0 ? trueCount / totalCount : 0;
  
          this.setCategoryScore(category.categoryName, currentDate, averageTrueCount);
  
          return { categoryName, taskData: parsedTaskData };
        });
  
        return 200;
    }
}