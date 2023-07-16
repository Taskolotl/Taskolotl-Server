import { TaskCategory } from "./TaskCategory";

interface GlobalScoringData {
  score: number;
  average: number;
  previousAverage: number;
}

interface CategoryData {
  score: number;
  average: number;
  previousAverage: number;
  categoryName: string;
  taskData: [string, boolean][];
}

interface ApiResponse {
  scoringData: GlobalScoringData
  categoryData: CategoryData[];
}

export class TaskList {
    private rootElement: HTMLElement;
    private summaryElement: HTMLElement;
    private taskData: TaskCategory[];

    constructor(taskDatas: TaskCategory[], score: number, average: number, previousAverage: number) {
        console.log("CREATED TASK LIST 2!");

        // Store task data
        this.taskData = taskDatas;

        //Create root element
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('container', 'taskListContainer');

        this.summaryElement = this.createSummaryRow(score, average, previousAverage);
        this.rootElement.appendChild(this.summaryElement);

        //Create rows
        taskDatas.forEach((taskData : TaskCategory) => {
            this.createCategoryTitle(taskData.categoryName);
            console.log(taskData.score + ", " + taskData.average + ", " + taskData.previousAverage);

            this.createCategorySummaryRow(taskData.score, taskData.average, taskData.previousAverage);

            taskData.taskData.forEach((taskEntry : [string, boolean]) => {
                this.createRow(taskEntry[0], taskEntry[1]);
            });
        });

        document.body.appendChild(this.rootElement);
    }

    private createCategorySummaryRow(score: number, average: number, previousAverage: number): void {
        console.log("AAA: " + score + ", " + average + ", " + previousAverage);
        const summaryLabel : string = "Score: " + Number(score.toFixed(2)) + ", AVG: " + Number(average.toFixed(2)) + ", PV-AVG: " + Number(previousAverage.toFixed(2));
        console.log(summaryLabel); 

        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        const colElement = document.createElement('div');
        colElement.classList.add('col');
        colElement.innerText = summaryLabel;

        rowElement.appendChild(colElement);

        this.rootElement.appendChild(rowElement);
    }

    private createSummaryRow(score: number, average: number, previousAverage: number): HTMLElement {
        const summaryLabel : string = "Score: " + Number(score.toFixed(2)) + ", AVG: " + Number(average.toFixed(2)) + ", PV-AVG: " + Number(previousAverage.toFixed(2));
        console.log(summaryLabel); 

        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        const colElement = document.createElement('div');
        colElement.classList.add('col');
        colElement.innerText = summaryLabel;

        rowElement.appendChild(colElement);

        return rowElement;
    }

    private createCategoryTitle(categoryName : string) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        const colElement = document.createElement('div');
        colElement.classList.add('col', 'categoryTitleFont');
        colElement.innerText = categoryName;

        rowElement.appendChild(colElement);
        this.rootElement.appendChild(rowElement);
    }

    private createRow(taskTitle: string, isTaskComplete: boolean) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        const checkboxColumnElement = document.createElement('div');
        checkboxColumnElement.classList.add('col');

        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('form-check');

        const formCheckInput = document.createElement('input');
        formCheckInput.classList.add('form-check-input', 'checkboxSize');
        formCheckInput.type = "checkbox";
        formCheckInput.value = "";
        formCheckInput.checked = isTaskComplete;
        formCheckInput.id = taskTitle;

        const labelElement = document.createElement('label');
        labelElement.classList.add('form-check-label', 'formCheckLabel');
        labelElement.setAttribute('for', taskTitle);
        labelElement.innerText = taskTitle;

        checkboxDiv.appendChild(formCheckInput);
        checkboxDiv.appendChild(labelElement);
        checkboxColumnElement.appendChild(checkboxDiv);
        rowElement.appendChild(checkboxColumnElement);
        this.rootElement.appendChild(rowElement);

        // Add event listener to the checkbox
        formCheckInput.addEventListener('change', () => {
            this.taskData.forEach((taskData: TaskCategory) => {
                taskData.taskData.forEach((taskEntry: [string, boolean]) => {
                    if (taskEntry[0] === taskTitle) {
                        taskEntry[1] = formCheckInput.checked;
                    }
                  });
              });
            this.logRows();
            this.sendDataToServer();
        });
    }

    private logRows() {
        console.log('Current Task List:');
        this.taskData.forEach((taskData: TaskCategory) => {
          console.log(`Category: ${taskData.categoryName}`);
          taskData.taskData.forEach((taskEntry: [string, boolean]) => {
            const [taskTitle, isTaskComplete] = taskEntry;
            console.log(`Task: ${taskTitle}, Completed: ${isTaskComplete}`);
          });
        });
      }

      private sendDataToServer(): void {
        const url = '/api/taskdata';
        const requestData = JSON.stringify(this.taskData);
      
        console.log('Sending taskData:', requestData);


        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to send data to server');
            }
            console.log('Data sent to server successfully');

            //get new scores
            this.getUpdatedScores();

          })
          .catch((error) => {
            console.error('Error sending data to server:', error);
          });
      }


      private async sendGetRequest(): Promise<ApiResponse> {
        const url = 'http://localhost:3000/api/data'; // Replace with your server URL
      
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const responseData: ApiResponse = await response.json();
            return responseData;
          } else {
            throw new Error('Request failed.'); // Handle errors
          }
        } catch (error) {
          // Handle network errors and other errors
          console.error(error);
          throw error;
        }
      }

      private getUpdatedScores(): void {
        this.sendGetRequest()
        .then((responseData: ApiResponse) => {
            
            this.rootElement.removeChild(this.summaryElement);
            document.body.removeChild(this.rootElement);
            // Store task data
            this.taskData = responseData.categoryData;

            //Create root element
            this.rootElement = document.createElement('div');
            this.rootElement.classList.add('container', 'taskListContainer');

            this.summaryElement = this.createSummaryRow(responseData.scoringData.score, responseData.scoringData.average, responseData.scoringData.previousAverage);
            this.rootElement.appendChild(this.summaryElement);

            //Create rows
            responseData.categoryData.forEach((taskData : TaskCategory) => {
                this.createCategoryTitle(taskData.categoryName);

                this.createCategorySummaryRow(taskData.score, taskData.average, taskData.previousAverage);

                taskData.taskData.forEach((taskEntry : [string, boolean]) => {
                    this.createRow(taskEntry[0], taskEntry[1]);
                });
            });

            document.body.appendChild(this.rootElement);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
      }
}