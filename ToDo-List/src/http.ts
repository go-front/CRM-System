import axios from 'axios';

interface ITask {
  id: number;
  value: string;
  isDone: boolean;
}
const APP_STATE_URL = 'https://easydev.club/api/v1/todos';

// export async function fetchTasks(status = 'all') {
//   try {
//     const response = await axios.get(`${APP_STATE_URL}?filter=${status}`);
//     console.log(1);

//     const resData = response.data;
//     return {
//       data: resData.data,
//       info: resData.info,
//     };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Ошибка: ', error.message);
//     }
//     return {
//       data: [],
//       info: null,
//     };
//   }
// }

export async function fetchTasks(status: string = 'all') {
  try {
    const response = await axios.get(`${APP_STATE_URL}?filter=${status}`);

    const resData = await response.data;
    return {
      data: resData.data,
      info: resData.info,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при запросе:', error.message);
    } else {
      console.error('Неизвестная ошибка:', error);
    }
    return {
      data: [],
      info: null,
    };
  }
}

export async function deleteTasks(taskId: number) {
  try {
    await axios.delete(`${APP_STATE_URL}/${taskId}`);
  } catch {
    console.log('Не удаётся удалить задачу');
  }
}

export async function newTasks(value: string) {
  try {
    if (value === '') {
      throw new Error('Задача не введена');
    }
    const response = await axios.post(
      `${APP_STATE_URL}`,
      { title: value, isDone: false },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.error('Ошибка: ', err.message);
  }
}

export async function updateTask(task: ITask) {
  try {
    const response = await axios.put(
      `${APP_STATE_URL}/${task.id}`,
      { body: task },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.error('Ошибка: ', err.message);
  }
}
