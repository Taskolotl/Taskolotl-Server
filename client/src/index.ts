import {TaskList} from './TaskList'
import { TaskCategory } from './TaskCategory';
import { response } from 'express';

async function sendGetRequest(): Promise<TaskCategory[]> {
  const url = 'http://localhost:3000/api/data'; // Replace with your server URL

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseData: TaskCategory[] = await response.json();
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
  .then((responseData: TaskCategory[]) => {
    // Handle the response data
    const myTaskList = new TaskList(responseData);
    console.log(responseData);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });