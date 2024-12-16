export async function fetchTasks() {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos');
    const resData = await response.json();
    return resData.data;
  } catch (error) {
    console.log('Обнаружена ошибка при загрузке данных');
    return [];
  }
}

export async function deleteTasks(taskId) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos/${taskId}`,
      {
        method: 'DELETE',
      },
    );
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
    const response = await fetch(`https://easydev.club/api/v1/todos`, {
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
