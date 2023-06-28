import {TaskList} from './TaskList'
import { TaskCategory } from './TaskCategory';
import { response } from 'express';

interface ApiResponse {
    score: number;
    average: number;
    previousAverage: number;
    categoryData: {
      categoryName: string;
      taskData: [string, boolean][];
      score: number;
      average: number;
      previousAverage: number;
    }[];
  }

  async function sendGetRequest(): Promise<ApiResponse> {
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



sendGetRequest()
  .then((responseData: ApiResponse) => {
    // Handle the response data
    console.log("SCORE: " + responseData.score);
    console.log("AVERAGE: " + responseData.average);
    console.log("PREV AVERAGE: " + responseData.previousAverage);
    const myTaskList = new TaskList(responseData.categoryData, responseData.score, responseData.average, responseData.previousAverage);
    console.log(responseData);
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
  });