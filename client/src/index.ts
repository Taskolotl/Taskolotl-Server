import {TaskList} from './TaskList'
import { TaskCategory } from './TaskCategory';
import { response } from 'express';

console.log("333");

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

  async function sendGetRequest(): Promise<ApiResponse> {
    const url = 'http://34.170.245.109/api/data'; // Replace with your server URL
  
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



sendGetRequest()
  .then((responseData: ApiResponse) => {
    console.log(JSON.stringify(responseData));

    // Handle the response data
    console.log("SCORE: " + responseData.scoringData.score);
    console.log("AVERAGE: " + responseData.scoringData.average);
    console.log("PREV AVERAGE: " + responseData.scoringData.previousAverage);
    const myTaskList = new TaskList(responseData.categoryData, responseData.scoringData.score, responseData.scoringData.average, responseData.scoringData.previousAverage);
    console.log(responseData);
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
  });