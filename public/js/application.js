const selector = document.getElementsByName('differentSort')[0];
const routesList = document.getElementsByClassName('routes')[0];
let infoBtn = [...document.getElementsByClassName('btnInfo')];
const btnSubmitComment = document.getElementsByName('submit_btn')[0];
const selectorRating = document.getElementsByName('selectorRating')[0];
const commentMessage = document.getElementsByName('message')[0];
const infoWayOne = [...document.getElementsByClassName('mainConteiner')];
const comentList = document.getElementById('comentList');
console.log(infoBtn)
  selector?.addEventListener('click', async () => {
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
      infoBtn = [...document.getElementsByClassName('btnInfo')];
      infoBtn?.forEach((el,index) => {
        el.addEventListener('click', () => {
          window.location = `http://localhost:3000/ways/${el.id}`
        })
      })
  })



infoBtn?.forEach((el,index) => {
    el.addEventListener('click', () => {
      window.location = `http://localhost:3000/ways/${el.id}`
  })
})



btnSubmitComment?.addEventListener('click', async () => {
  // selectorRating.value
  console.log(selectorRating.value)
  console.log(commentMessage.value)

  const response = await fetch('/ways/comment', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      rating: selectorRating.value,
      text: commentMessage.value,
      way_id: infoWayOne[0].id
    })
  });

  const {newComment} = await response.json();
  console.log(newComment)
  comentList.innerHTML = renderNewComment(newComment) + comentList.innerHTML;
  commentMessage.value = '';
  selectorRating.value = 5
})
