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
  });
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      'Москва, метро Сокол',
      'Москва, метро Павелецкая',
    ],
  });
  // Включение режима редактирования.
  multiRoute.editor.start();
  // А вот так можно отключить режим редактирования.
  // Добавление маршрута на карту.
  myMap.geoObjects.add(multiRoute);
  const control = myMap.controls.get('routePanelControl');
  control.routePanel.state.set({
    type: 'bicycle', // пешком
  });
  control.routePanel.options.set({
    // Типы маршрутизации, которые будут доступны
    // для выбора пользователям.
    // В примере можно построить
    // автомобильный маршрут с вызовом такси и пешеходный маршрут.
    // При использовании CSP, убедитесь что у вас подключена последняя версия правил.
    // В противном случае, маршрутизация с типом "taxi" не будет работать.
    types: {
      pedestrian: true,
      bicycle: true,
      taxi: true,
    },
  });
}





// const arr = []
// const time = setInterval(() => {
//   const input = [...document.getElementsByClassName('ymaps-2-1-79-route-panel-input__input')];
//   if (input.length && input[0].value !== `<empty string>` 
//   && input[0].value !=='' ) {
//     let x, y;
//     x = input[0].value.split(',').map(el=> parseFloat(el))
//     if (!isNaN(x[0])) arr.push(x)
//       if (input.length && input[1].value !== `<empty string>` && input[1].value !=='') {
//         y = input[1].value.split(',').map(el=> parseFloat(el))
//         if (y[0]) arr.push(y)
//         clearInterval(time);
//         console.log(arr);
//       }
//   }
// }, 100);
