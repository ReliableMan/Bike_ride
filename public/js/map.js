// ymaps.ready(init);

// function init() {
//   const { geolocation } = ymaps;
//   const myMap = new ymaps.Map('map', {
//     center: [55, 34],
//     zoom: 10,
//     controls: ['routePanelControl'],
//   }, {
//     searchControlProvider: 'yandex#search',
//   });

//   var myPlacemark = new ymaps.Placemark([55.8, 37.6]);
//   myMap.geoObjects.add(myPlacemark);
  // Сравним положение, вычисленное по ip пользователя и
  // положение, вычисленное средствами браузера.
  // geolocation.get({
  //   provider: 'yandex',
  //   mapStateAutoApply: true,
  // }).then((result) => {
  //   // Красным цветом пометим положение, вычисленное через ip.
  //   result.geoObjects.options.set('preset', 'islands#redCircleIcon');
  //   result.geoObjects.get(0).properties.set({
  //     balloonContentBody: 'Мое местоположение',
  //   });
  //   myMap.geoObjects.add(result.geoObjects);
  // });
  // geolocation.get({
  //   provider: 'browser',
  //   mapStateAutoApply: true,
  // }).then((result) => {
  //   // Синим цветом пометим положение, полученное через браузер.
  //   // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
  //   result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
  //   myMap.geoObjects.add(result.geoObjects);
  // });

  // Включение режима редактирования.
  // multiRoute.editor.start();
  // А вот так можно отключить режим редактирования.
  // Добавление маршрута на карту.
  // myMap.geoObjects.add(multiRoute);
  // const control = myMap.controls.get('routePanelControl');
  // control.routePanel.state.set({
  //   type: 'bicycle', // пешком
  // });
  // control.routePanel.options.set({
  //   // Типы маршрутизации, которые будут доступны
  //   // для выбора пользователям.
  //   // В примере можно построить
  //   // автомобильный маршрут с вызовом такси и пешеходный маршрут.
  //   // При использовании CSP, убедитесь что у вас подключена последняя версия правил.
  //   // В противном случае, маршрутизация с типом "taxi" не будет работать.
  //   types: {
  //     pedestrian: true,
  //     bicycle: true,
  //     taxi: true,
  //   },
  // });

  // myPlacemark.events.add('click', function (e) {
  //   // Получение координат щелчка
  //   var coords = e.get('coords');
  //   console.log('!!!!!!!!!!', coords);
  //   //alert(coords.join(', '));
  //   console.log(coords.join(', '));
  // });
  // console.log("-----------------!!!!");
  // console.log("-----------------", myMap.controls);
  // myMap.events.add('click', function (e) {
  //   var coords = e.get('coords');
  //   console.log(coords); // Возникнет при щелчке на карте, но не на маркере.
  // });
//   var control = myMap.controls.get('routePanelControl');

//   control.routePanel.events.add('click', function (e) {
//     var coords = e.get('coords');
//     console.log(coords); // Возникнет при щелчке на карте, но не на маркере.
//   });
// }




// const obj = {}
// // const arr = document.getElementsByClassName()
// // VM1010:1 Uncaught TypeError: Failed to execute 'getElementsByClassName' on 'Document': 1 argument required, but only 0 present.
// //     at <anonymous>:1:22
// // (anonymous) @ VM1010:1
// const arr = document.getElementsByClassName('ymaps-2-1-79-route-panel-input__input')
// // undefined
// // var arr3 = Array.prototype.slice.call( obj.arr )
// // var arr2 = Array.from(obj.arr);

// // VM1084:1 (2) [input.ymaps-2-1-79-route-panel-input__input, input.ymaps-2-1-79-route-panel-input__input]
// // undefined
// console.log(arr[1])




