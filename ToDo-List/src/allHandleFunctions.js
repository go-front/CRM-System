export function handleAddTask() {
  const addTask = () => {
    if (
      inputTask.trim() === '' ||
      inputTask.length < 2 ||
      inputTask.length > 64
    ) {
      alert(
        'Введенный текст не соостветствует требованиям добавления задачи: поле не должно быть пустым, текст должен содержать от 2 до 64 символов. Повторите добавление задачи',
      );
      setInputTask('');
    } else {
      onAddTask(inputTask);
      setInputTask('');
    }
  };
}
