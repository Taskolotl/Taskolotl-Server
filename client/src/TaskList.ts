import { TaskCategory } from "./TaskCategory";

export class TaskList {
    private rootElement: HTMLElement;

    constructor(taskDatas: TaskCategory[]) {
        console.log("CREATED TASK LIST 2!");

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
    }
}