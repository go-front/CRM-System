interface ITask {
  id: number;
  value: string;
  isDone: boolean;
}
const APP_STATE_URL = "https://easydev.club/api/v1/todos";

export async function fetchTasks(status = "all") {
  try {
    const response = await fetch(`${APP_STATE_URL}?filter=${status}`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }
    const resData = await response.json();
    return {
      data: resData.data,
      info: resData.info,
    };
  } catch (error) {
    const err = error as Error;
    console.error("Ошибка: ", err.message);
    return {
      data: [],
      info: null,
    };
  }
}

export async function deleteTasks(taskId: number) {
  try {
    const response = await fetch(`${APP_STATE_URL}/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Проблема с сервером");
    }
  } catch {
    console.log("Не удаётся удалить задачу");
  }
}

export async function newTasks(value: string) {
  try {
    if (value === "") {
      throw new Error("Задача не введена");
    }
    const response = await fetch(`${APP_STATE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: value, isDone: false }),
    });
    if (!response.ok) {
      throw new Error("Задача не была добавлена");
    }
    const addedTask = await response.json();
    return addedTask;
  } catch (error) {
    const err = error as Error;
    console.error("Ошибка: ", err.message);
  }
}

export async function updateTask(task: ITask) {
  try {
    const response = await fetch(`${APP_STATE_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Задача не была обновлена");
    }
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    const err = error as Error;
    console.error("Ошибка: ", err.message);
  }
}
