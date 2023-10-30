const fs = require("fs"); //Подключаем модуль fs для работы с файлами
const path = require("path"); //Для использования привычных относительных путей подключаем модуль path

const getUsers = () => {
  const filePath = path.join(__dirname, "../data/users.json");
  return fs.readFileSync(filePath);
}; //При помощи функции readFileSync синхронно получаем список пользователей из файла.

module.exports = getUsers; //Экспортируем функцию
