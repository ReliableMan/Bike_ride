/* eslint-disable max-len */
let poleVvoda = document.getElementsByClassName('poleVvoda')
const coordInfo = document.getElementsByClassName('coordInfo');
const arr5 = coordInfo[0]?.id
const obj = {start: arr5?.split('/')[0].replace('_', ', ') || 'Москва, метро Сокол', end: arr5?.split('/')[1].replace('_', ', ') || 'Москва, метро Павелецкая'}
console.log(obj) // нам нужна подобная строка формата "56.33821041, 36.74362897"
const wayImage = document.getElementById('wayImage');
const wayTitle = document.getElementById('wayTitle');
const wayCity = document.getElementById('wayCity');
const wayText = document.getElementById('wayText');

const btnNewWay = [...document.getElementsByClassName('btnNewWay')];
const btnEditWay = [...document.getElementsByClassName('btnEditWay')];


ymaps.ready(init);
function init() {
  const { geolocation } = ymaps;
  const myMap = new ymaps.Map('map', {
    center: [55, 34],
    zoom: 10,
    controls: ['routePanelControl'],
  }, {
    searchControlProvider: 'yandex#search',
  });
  // Сравним положение, вычисленное по ip пользователя и
  // положение, вычисленное средствами браузера.
  geolocation.get({
    provider: 'yandex',
    mapStateAutoApply: true,
  }).then((result) => {
    // Красным цветом пометим положение, вычисленное через ip.
    result.geoObjects.options.set('preset', 'islands#redCircleIcon');
    result.geoObjects.get(0).properties.set({
      balloonContentBody: 'Мое местоположение',
    });
    myMap.geoObjects.add(result.geoObjects);
  });
  poleVvoda = document.getElementsByClassName('poleVvoda')
  if (poleVvoda[0].id === 'info') {
  // geolocation.get({
  //   provider: 'browser',
  //   mapStateAutoApply: true,
  // }).then((result) => {
  //   // Синим цветом пометим положение, полученное через браузер.
  //   // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
  //   result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
  //   myMap.geoObjects.add(result.geoObjects);
  //   // const loc = myMap.geoObjects.add(result.geoObjects);
  //   // console.log(loc);
  // });
  } else {
    geolocation.get({
      provider: 'browser',
      mapStateAutoApply: true,
    }).then((result) => {
      // Синим цветом пометим положение, полученное через браузер.
      // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
      result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
      myMap.geoObjects.add(result.geoObjects);
      // const loc = myMap.geoObjects.add(result.geoObjects);
      // console.log(loc);
    });
  }
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      // 'Москва, метро Сокол',
      // 'Москва, метро Павелецкая',
      obj.start || 'Москва, метро Сокол', obj.end || 'Москва, метро Павелецкая'
    ],
  });

  // Включение режима редактирования.
  // multiRoute.editor.start();
  // А вот так можно отключить режим редактирования.
  // Добавление маршрута на карту.

  myMap.geoObjects.add(multiRoute);
  const control = myMap.controls.get('routePanelControl');
  control.routePanel.state.set({
    type: 'bicycle', // пешком
  });
  control.routePanel.options.set({
    types: {
      pedestrian: true,
      bicycle: true,
      taxi: true,
    },
  });
}

