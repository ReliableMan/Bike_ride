
// ymaps.ready(init);

// function init() {
//   const myMap = new ymaps.Map('map', {
//     center: [55.745508, 37.435225],
//     zoom: 13,
//   });

//   // Добавим на карту схему проезда
//   // от улицы Крылатские холмы до станции метро "Кунцевская"
//   // через станцию "Молодежная" и затем до станции "Пионерская".
//   // Точки маршрута можно задавать 3 способами:
//   // как строка, как объект или как массив геокоординат.
//   ymaps.route([
//     'Москва, улица Крылатские холмы',
//     {
//       point: 'Москва, метро Молодежная',
//       // метро "Молодежная" - транзитная точка
//       // (проезжать через эту точку, но не останавливаться в ней).
//       type: 'viaPoint',
//     },
//     [55.731272, 37.447198], // метро "Кунцевская".
//     'Москва, метро Пионерская',
//   ]).then((route) => {
//     myMap.geoObjects.add(route);
//     // Зададим содержание иконок начальной и конечной точкам маршрута.
//     // С помощью метода getWayPoints() получаем массив точек маршрута.
//     // Массив транзитных точек маршрута можно получить с помощью метода getViaPoints.
//     const points = route.getWayPoints();
//     const lastPoint = points.getLength() - 1;
//     // Задаем стиль метки - иконки будут красного цвета, и
//     // их изображения будут растягиваться под контент.
//     points.options.set('preset', 'twirl#redStretchyIcon');
//     // Задаем контент меток в начальной и конечной точках.
//     points.get(0).properties.set('iconContent', 'Точка отправления');
//     points.get(lastPoint).properties.set('iconContent', 'Точка прибытия');

//     // Проанализируем маршрут по сегментам.
//     // Сегмент - участок маршрута, который нужно проехать до следующего
//     // изменения направления движения.
//     // Для того, чтобы получить сегменты маршрута, сначала необходимо получить
//     // отдельно каждый путь маршрута.
//     // Весь маршрут делится на два пути:
//     // 1) от улицы Крылатские холмы до станции "Кунцевская";
//     // 2) от станции "Кунцевская" до "Пионерская".


//   }


// <div class="rout">
// <img src="https://kianews24.ru/wp-content/uploads/2021/09/Screenshot-2021-09-15-at-14-30-47-Google-Karti.png"
//   class="img" width="200px" height="200px">
// <h3>Маршрут1</h3>
// <button class="btn btnInfo" id="1">Посмотреть</button>
// <p>Рейтинг: </p>
// </div>
// <div class="rout">
// <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHuEKYw2SsA5TGrz2xXDFkdzO-HDKKsBtLSQ&usqp=CAU"
//   class="img" width="200px" height="200px">
// <h3>Маршрут2</h3>
// <button class="btn btnInfo" id="2">Посмотреть</button>
// <p>Рейтинг: </p>
// </div>
// <div class="rout">
// <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6_6yOPnmwbvMYZX0W5arLd4Z02SC8CnbyA&usqp=CAU"
//   class="img" width="200px" height="200px">
// <h3>Маршрут3</h3>
// <button class="btn btnInfo" id="3">Посмотреть</button>
// <p>Рейтинг: </p>
// </div>
// <div class="rout">
// <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2l-QSRQce5HxsrzYGonA9dzXyJsUbnJT0A&usqp=CAU"
//   class="img" width="200px" height="200px">
// <h3>Маршрут4</h3>
// <button class="btn btnInfo" id="4">Посмотреть</button>
// <p>Рейтинг: </p>
// </div>
