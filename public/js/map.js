ymaps.ready(init);

function init() {
  const { geolocation } = ymaps;

  myMap = new ymaps.Map('map', {
    center: [55, 34],
    zoom: 10,
    controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl'],
  }, {
    searchControlProvider: 'yandex#search',
  });

  var myPlacemark,
    myMap.events.add('click', function (e) {
      var coords = e.get('coords');

      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });

  // Создание метки.
  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties
        .set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', '),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine()
        });
    });
  }
}
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
  referencePoints: [],
}, {
  editorDrrawOver: false,
  editorMidPointsType: 'via',
});
// Включение режима редактирования.
multiRoute.editor.start({
  addWayPoints: false,
  removeWayPoints: true,
  addMidPoints: true,
});
myMap.geoObjects.add(multiRoute);
}
