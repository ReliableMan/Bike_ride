const selector = document.getElementsByName('differentSort')[0];
const routesList = document.getElementsByClassName('routes')[0];


selector.addEventListener('click', async () => {
    console.log(selector.value)
    // отправляем фетч на запрос сортировки и отрисовки
    // можем принять их все из фича и отрисовать динамически
    // удалив имеющиеся элементы
    const response = await fetch(`http://localhost:3000/ways/sort/${selector.value}`, {
        method: "GET"})
      const {ways} = await response.json(); // массив

      routesList.innerHTML = ''
      ways.forEach(way => {
        routesList.innerHTML += renderWayList(way)
      });
  })

