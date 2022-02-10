
/* eslint-disable max-len */
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
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      'Москва, метро Сокол',
      'Москва, метро Павелецкая',
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


// // VM1084:1 (2) [input.ymaps-2-1-79-route-panel-input__input, input.ymaps-2-1-79-route-panel-input__input]
// // undefined
// console.log(arr[1])

