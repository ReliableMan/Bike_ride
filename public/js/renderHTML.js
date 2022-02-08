function renderWayList(way) {
  return `
  <div class="rout" id="${way.id}">
    <img src="https://geographyofrussia.com/wp-content/uploads/2009/05/6122.jpg" alt="sfgdsfghfd" class="img" width="200px"
      height="200px">
    <h3>${way.title}</h3>
    <button class="btn" id="route4">Перейти</button>
    <p>Рейтинг: </p>
  </div>
  `
}
