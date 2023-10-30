// Для запуска сервера необходимо выполнить команду в терминале node src/app.js
// Для того, чтобы при внесении изменений не приходилось каждый раз перезапускать сервер,
// установим пакет nodemon. Для этого выполним команду:  npm install nodemon --save-dev
// или же команду: npm i nodemon -dev
// Теперь сервер можно запускать при помощи команды: nodemon src/app.js Но ее надо добавить в скрипты package.json

const http = require("http"); //Подключаем модуль HTTP
const getUsers = require("./modules/users"); //Модуль с пользовательской функцией для получения списка из файла

const port = 3003;
const hostname = "127.0.0.1";

const server = http.createServer((request, response) => {
  const reqUrl = new URL(request.url, `http://${hostname}:${port}`);

  //Параметр request храит информацию о запросе
  //    Основные методы:
  //    headers: возвращает заголовки запроса
  //    method: тип запроса (GET, POST, DELETE, PUT)
  //    url: представляет запрошенный адрес

  if (reqUrl.search) {
    const helloValue = reqUrl.searchParams.get("hello");
    switch (helloValue) {
      case "":
        //Если параметр hello указан, но не передано <name>, то ответ строка Enter a name, код ответа 400.
        response.statusCode = 400;
        response.statusMessage = "ERROR";
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.write("Enter a name");
        break;
      case null:
        if (reqUrl.search === "?users") {
          //Ответом на запрос ?users должен быть JSON с содержимым файла data/users.json, код ответа 200.
          response.statusCode = 200;
          response.statusMessage = "OK";
          response.setHeader("Content-Type", "application/json");
          response.write(getUsers());
        } else {
          //Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500.
          response.statusCode = 500;
          response.statusMessage = " ";
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
          response.write(" ");
        }
        break;
      default:
        //Ответом на запрос ?hello=<name> должна быть строка Hello, <name>., код ответа 200.
        //console.log(helloValue);
        response.statusCode = 200;
        response.statusMessage = "OK";
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.write(`Hello, ${helloValue}`);
        break;
    }
    response.end();
    return;
  } else {
    //Если никакие параметры не переданы, то ответ строка Hello, World!, код ответа 200.
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.write("Hello, World!");
    response.end();
    return;
  }

  //Параметр response управляет отправкой ответа
  // Основные методы:
  // statusCode: устанавливает статусный код ответа
  // statusMessage: устанавливает сообщение, отправляемое вместе со статусным кодом
  // setHeader(name, value): добавляет в ответ один заголовок
  // write: пишет в поток ответа некоторое содержимое
  // writeHead: добавляет в ответ статусный код и набор заголовков
  // end: сигнализирует серверу, что заголовки и тело ответа установлены, в итоге ответ отсылается клиента.
  //... Данный метод должен вызываться в каждом запросе.
}); //При помощи метода createServer создаем (инитим) сервер

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу по адресу http://${hostname}:${port}`);
}); //При помощи метода listen запускаем сервер
