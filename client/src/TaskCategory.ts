export interface TaskCategory {
    categoryName: string;
    taskData: [string, boolean][];
    score: number;
    average: number;
    previousAverage: number;
}