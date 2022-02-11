function renderWayList(way) {
  return `
  <div class="rout" id="${way.id}">
    <img src="${way.url_img}" alt="sfgdsfghfd" class="img" width="200px"
      height="200px">
    <h3>${way.title}</h3>
    <button class="btn btnInfo" id="${way.id}">Посмотреть</button>
    <p>Рейтинг: ${way.rating}</p>
    <p>Расстояние: ${way.distance}</p>
  </div>
  `
}


function renderNewComment(newComment) {
  return `<li class="commentList" style="border: 1px solid black;">
              <div id="comment"></div>
                  <h3><b><a href="/user/${newComment.user_id}">User:${newComment.username}</a></b></h3> <span>${newComment.rating}</span>
                  <p>Отзыв: ${newComment.text}</p>
                  <a class="delComment" href="/ways/comment/delete/${newComment.id}">Удалить комментарий </a> </li>`
}
