import { TaskCategory } from "./TaskCategory";

export class TaskList {
    private rootElement: HTMLElement;
    private taskData: TaskCategory[];

    constructor(taskDatas: TaskCategory[]) {
        console.log("CREATED TASK LIST 2!");

        // Store task data
        this.taskData = taskDatas;

        //Create root element
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('container', 'taskListContainer');

        //Create rows
        taskDatas.forEach((taskData : TaskCategory) => {
            this.createCategoryTitle(taskData.categoryName);

            taskData.taskData.forEach((taskEntry : [string, boolean]) => {
                this.createRow(taskEntry[0], taskEntry[1]);
            });
        });

        document.body.appendChild(this.rootElement);
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
          })
          .catch((error) => {
            console.error('Error sending data to server:', error);
          });
      }
}