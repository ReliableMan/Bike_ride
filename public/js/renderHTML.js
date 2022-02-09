function renderWayList(way) {
  return `
  <div class="rout" id="${way.id}">
    <img src="https://geographyofrussia.com/wp-content/uploads/2009/05/6122.jpg" alt="sfgdsfghfd" class="img" width="200px"
      height="200px">
    <h3>${way.title}</h3>
    <button class="btn btnInfo" id="${way.id}">Перейти</button>
    <p>Рейтинг: ${way.rating}</p>
  </div>
  `
}


function renderNewComment(newComment) {
  return `<li style="border: 1px solid black;">
              <div id="comment"></div>
                  <h3><b>User: ${newComment.user_id} (Пока что это id Пользователя)</b></h3> <span>${newComment.rating}</span>
                  <p>Отзыв: ${newComment.text}</p>
            </li>`
}
