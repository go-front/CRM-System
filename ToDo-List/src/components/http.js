const APP_STATE_URL = 'https://easydev.club/api/v1/todos';

export async function fetchTasks() {
  try {
    const response = await fetch(`${APP_STATE_URL}`);
    const resData = await response.json();
    return resData.data;
  } catch (error) {
    console.log('Обнаружена ошибка при загрузке данных');
    return [];
  }
}

// export async function fetchTasks() {
//   try {
//     const response = await fetch(`${APP_STATE_URL}`);
//     const resData = await response.json();
//     return resData.data;
//   } catch (error) {
//     console.log('Обнаружена ошибка при загрузке данных');
//     return [];
//   }
// }

// export async function fetchStatus(task) {
//   try {
//     const response = await fetch(`${APP_STATE_URL}/${task.id}`);
//     const resData = await response.json();
//     return resData.isDone;
//   } catch (error) {
//     console.log('Не удалось статус задачи с сервера');
//   }
// }

export async function deleteTasks(taskId) {
  try {
    const response = await fetch(`${APP_STATE_URL}/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Проблема с сервером');
    }
  } catch (error) {
    console.log('Не удаётся удалить задачу');
  }
}

export async function newTasks(value) {
  try {
    if (value === '') {
      throw new Error('Задача не введена');
    }
    const response = await fetch(`${APP_STATE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: value, isDone: false }),
    });
    if (!response.ok) {
      throw new Error('Задача не была добавлена');
    }
    console.log('Задача успешно добавлена');
    const addedTask = await response.json();
    console.log('Добавленная задача:', addedTask);
    return addedTask;
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateTask(task) {
  try {
    const response = await fetch(`${APP_STATE_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Задача не была обновлена');
    }
    console.log('Задача успешно обновлена');
    const updatedTask = await response.json();
    console.log('Обновленная задача:', updatedTask);
    return updatedTask;
  } catch (error) {
    console.error(error.message);
  }
}
