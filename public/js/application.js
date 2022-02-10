const selector = document.getElementsByName('differentSort')[0];
const routesList = document.getElementsByClassName('routes')[0];
let infoBtn = [...document.getElementsByClassName('btnInfo')];
const btnSubmitComment = document.getElementsByName('submit_btn')[0];
const selectorRating = document.getElementsByName('selectorRating')[0];
const commentMessage = document.getElementsByName('message')[0];
const infoWayOne = [...document.getElementsByClassName('mainConteiner')];
const comentList = document.getElementById('comentList');
const btnEditProfile = [...document.getElementsByClassName('btnEditProfile')];
const btnEnterEditProfile = [...document.getElementsByClassName('btnEnterEditProfile')];

// console.log(infoBtn)
  selector?.addEventListener('click', async () => {
    // console.log(selector.value)
    const response = await fetch(`http://localhost:3000/ways/sort/${selector.value}`, {
        method: "GET"})
      const {ways} = await response.json(); // массив

      routesList.innerHTML = ''
      ways.forEach(way => {
        // console.log(way)
        routesList.innerHTML += renderWayList(way)
      });
      infoBtn = [...document.getElementsByClassName('btnInfo')];
      infoBtn?.forEach((el,index) => {
        el.addEventListener('click', () => {
          // console.log(5434534534654)
          window.location = `http://localhost:3000/ways/${el.id}`
        })
      })
  })



infoBtn?.forEach((el,index) => {
    el.addEventListener('click', () => {
      window.location = `http://localhost:3000/ways/${el.id}`
  })
})


function deletComment() {
  const delComment = [...document.getElementsByClassName('delComment')]
  const commentList = [...document.getElementsByClassName('commentList')]
  delComment.forEach((del, ind) => {
    del.addEventListener('click', async (event) => {
      event.preventDefault();
      // console.log(del.href)
      const response = await fetch(del.href, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
       });
      const {delet} = await response.json();
      if (delet) commentList[ind].parentNode.removeChild(commentList[ind])
      deletComment();
    })
  })
}


btnSubmitComment?.addEventListener('click', async () => {
  // selectorRating.value
  // console.log(selectorRating.value)
  // console.log(commentMessage.value)
  const rating = document.getElementById('rating')

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
  const {newComment, newRating} = await response.json();
  rating.textContent = newRating
  // console.log(newComment)
  comentList.innerHTML = renderNewComment(newComment) + comentList.innerHTML;
  commentMessage.value = '';
  selectorRating.value = 5;
  deletComment();
})


btnEditProfile[0]?.addEventListener('click', () => {
  window.location = `http://localhost:3000/user/edit/${btnEditProfile[0].id}`
})


btnEnterEditProfile[0]?.addEventListener('click', async () => {
  const formControl = [...document.getElementsByClassName('form-control')]
  // const formControl2 = [...document.getElementsByClassName('about_me')]
  const aboutMeInput = document.getElementById('about_me');
//  const obj = {
//     city: formControl[2].value,
//     bike: formControl[0].value,
//     about_me: aboutMeInput.value,
//     user_id: btnEnterEditProfile[0].id,
//     age: formControl[0].value,
//     role: undefined || "user"
//   }
  // console.log(obj, formControl2[0].value)
  const response = await fetch(`/user/edit/${btnEnterEditProfile[0].id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      city: formControl[2].value,
      bike: formControl[0].value,
      about_me: aboutMeInput.value,
      user_id: btnEnterEditProfile[0].id,
      age: formControl[1].value,
      role: undefined || "user"
    })
  });
  const {} = await response.json();
  window.location = `http://localhost:3000/user/${btnEnterEditProfile[0].id}`
})


function addAdmin() {
  // console.log(234243)
  const adm = document.getElementById('adm')
  let btnToAddAdmin = [...document.getElementsByClassName('btnToAddAdmin')];
  let btnToDelAdmin = [...document.getElementsByClassName('btnToDelAdmin')];
  // console.log(btnToAddAdmin)
  btnToAddAdmin[0]?.addEventListener('click', async () => {
    // console.log(btnToAdmin[0].id)
    const id = btnToAddAdmin[0].id;
    const response = await fetch(`/user/admin/${btnToAddAdmin[0].id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: id,
        role: "admin"
      })
    });
    const {editUser} = await response.json();
    if(editUser) {
      adm.innerHTML = `<button id="${id}" class="btn btnToDelAdmin">Удалить права администратора</button>`
      // btnToAddAdmin[0].parentNode.removeChild(btnToAddAdmin[0]);
      // console.log(adm.innerHTML)
      btnToDelAdmin = [...document.getElementsByClassName('btnToDelAdmin')];
      addAdmin();
      console.log(`Пользователю ${id} Добавлены права администратора`)
    }
  })

  btnToDelAdmin[0]?.addEventListener('click', async () => {
    // console.log('------------------', btnToDelAdmin[0].id)
    const id = btnToDelAdmin[0].id;
    const response = await fetch(`/user/admin/${btnToDelAdmin[0].id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: id,
        role: "user"
      })
    });
    const {editUser} = await response.json();
    if(editUser) {
      adm.innerHTML = `<button id="${id}" class="btn btnToAddAdmin">Установить права администратора</button>`
      // btnToDelAdmin[0].parentNode.removeChild(btnToDelAdmin[0]);
      btnToAddAdmin = [...document.getElementsByClassName('btnToAddAdmin')];
      addAdmin();
      console.log(`У пользователя ${id} удалены права администратора`)
    }
})


  

deletComment()




















}
addAdmin()
