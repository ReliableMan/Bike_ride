
// require('dotenv').config();
// // 
// const { Way, User, UserInfo } = require('./db/models/');

// require('dotenv').config();

// const { Way, User, UserInfo } = require('./db/models/');


// // async function qwer() {
// //   const way = UserInfo.create({
// //     bike: 'BNW',
// //     city: 'Moskva',
// //     about_me: `Зачастую нам надо повторять одно и то же действие во многих частях программы.

// //                               Например, необходимо красиво вывести сообщение при приветствии посетителя, при выходе посетителя с сайта, ещё где-нибудь.

// //                               Чтобы не повторять один и тот же код во многих местах, придуманы функции. Функции являются основными «строительными блоками» программы.

// //                               Примеры встроенных функций вы уже видели – это alert(message), prompt(message, default) и confirm(question). Но можно создавать и свои.`,
// //     user_id: 1,
// //     age: 4564326,
// //   })
// // }



// async function qwer() {
//   const way = Way.create({ title: 'Magis Kohlrabi Welsh Onion', body: 'Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed collard greens nori. Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout chard.', user_id: 1 })
// }

// qwer()

// const body = {
//   wayTitle: 'еуые',
//   wayCity: 'мск',
//   wayImage: 'https://yulsun.ru/misc/img/ny/cap.png',
//   wayText: '234234234234234234234234',
//   xy1: [ 54.89542721, 38.014534 ],
//   xy2: [ 54.87246716, 38.02758027 ],
//   distance: '7,5 км'
// }



// async function qwer() {
//   const way = await Way.create({ 
//     title: body.wayTitle, 
//     body: body.wayText, 
//       user_id: 1,
//       distance: body.distance,
//       xy_start: body.xy1.join('_'),
//       xy_end: body.xy2.join('_'),
//       url_img: body.wayImage,
//       }, { returning: true, plain: true, raw:true })
//   console.log(way)
// }

// qwer()
// >>>>>>> main
// // //qwer()

