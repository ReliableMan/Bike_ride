const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
// Импортируем созданный в отдельный файлах рутеры.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const waysRouter = require('./routes/way.js');

const app = express();
const PORT = 3000;
// подключаем БД базы для хранения кукисов (session storage) Используем базу данных Redis v3
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
app.set('views', path.join(__dirname, 'views'));

// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());


// записывает в переменную req.session.user данные из прилетевшей куки, если такаяже была найдена в базе данных для кук.
//  если куки нету или она не найдена в session storage, то req.session.user будет равно unfefined

const sessionConfig = {
  name: 'sid', // название куки
  store: new RedisStore({ client: redisClient }), // подключаем БД для храненя куков
  secret: process.env.COOKIE_SECRET, // ключ для шифрования cookies // require('crypto').randomBytes(10).toString('hex')
  resave: false,                     // Если true,  пересохраняет сессию, даже если она не поменялась
  saveUninitialized: false, // Если false, куки появляются только при установке req.session
  cookie: {
    secure: process.env.NODE_ENV === 'production', // В продакшне нужно "secure: true" для работы через протокол HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 10, // время жизни cookies, ms (10 дней)
  },
}
app.use(session(sessionConfig));

//  сохраняем в обьект res.locals.username имя пользователя для использования username в hbs
// app.use(userMiddleware);

//  сохраняем в обьект res.locals.username имя пользователя для использования username в layout.hbs
app.use((req, res, next) => {
  
  res.locals.username = req.session?.user?.name;
  
  console.log("\n\x1b[33m", 'req.session.user :', req.session.user);
  console.log("\x1b[35m", 'res.locals.username:', res.locals.username);
  next();
});
app.use('/', indexRouter);
app.use('/ways', waysRouter);
app.use('/user', usersRouter);

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use(function (err, req, res, next) {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;
  
  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
})
