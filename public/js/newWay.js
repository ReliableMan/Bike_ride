const wayImage = document.getElementById('wayImage');
const wayTitle = document.getElementById('wayTitle');
const wayCity = document.getElementById('wayCity');
const wayText = document.getElementById('wayText');

const btnNewWay = [...document.getElementsByClassName('btnNewWay')];
const btnEditWay = [...document.getElementsByClassName('btnEditWay')];

const arrCoord = []
const time = setInterval(() => {
  const input = [...document.getElementsByClassName('ymaps-2-1-79-route-panel-input__input')];
  if (input.length && input[0].value !== `<empty string>`
  && input[0].value !=='' ) {
    let x, y;
    x = input[0].value.split(',').map(el=> parseFloat(el));
    if (!isNaN(x[0])) arrCoord.push(x);
      if (input.length && input[1].value !== `<empty string>` && input[1].value !=='') {
        y = input[1].value.split(',').map(el=> parseFloat(el));
        if (y[0]) arrCoord.push(y);
        clearInterval(time);
        console.log(arrCoord)
        btnNewWay[0]?.addEventListener('click', () => {
          createEntryesWay(arrCoord);
        })
      }
  }
}, 100);



async function createEntryesWay(arrCoord = []) {
  const distance = [...document.getElementsByClassName('ymaps-2-1-79-transport-pin__text')];
  const dataNewWay = {
    wayTitle: wayTitle.value,
    wayCity: wayCity.value,
    wayImage: wayImage.value,
    wayText: wayText.value,
    xy1: arrCoord[0],
    xy2: arrCoord.pop(),
    distance: distance[0]?.textContent || 'Расстояние неопределено'
  }
  console.log(dataNewWay);
  const response = await fetch('/ways/new/add', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataNewWay)
  });
  const {newWay} = await response.json();
  window.location = `http://localhost:3000/ways/${newWay.id}`;
}





const arrCoordEdit = []
const timeEdit = setInterval(() => {
  const inputEdit = [...document.getElementsByClassName('ymaps-2-1-79-route-panel-input__input')];
  if (inputEdit.length && inputEdit[0].value !== `<empty string>`
  && inputEdit[0].value !=='' ) {
    let xEdit, yEdit;
    // console.log(inputEdit[0].value)
    xEdit = inputEdit[0].value.split(',').map(el=> parseFloat(el));
    if (!isNaN(xEdit[0])) arrCoordEdit.push(xEdit);
      if (inputEdit.length && inputEdit[1].value !== `<empty string>` && inputEdit[1].value !=='') {
        yEdit = inputEdit[1].value.split(',').map(el=> parseFloat(el));
        if (yEdit[0]) arrCoordEdit.push(yEdit);
        clearInterval(timeEdit);
        btnEditWay[0]?.addEventListener('click', () => {
          editEntryesWay(arrCoordEdit);
        })
      }
  }
}, 100);



async function editEntryesWay(arrCoordEdit = []) {
  const distanceEdit = [...document.getElementsByClassName('ymaps-2-1-79-transport-pin__text')];
  const dataWayEdit = {
    id: btnEditWay[0].id,
    wayTitle: wayTitle.value,
    wayCity: wayCity.value,
    wayImage: wayImage.value,
    wayText: wayText.value,
    xy1: arrCoordEdit[0],
    xy2: arrCoordEdit.pop(),
    distance: distanceEdit[0]?.textContent || 'Расстояние неопределено'
  }
  console.log(dataWayEdit);
  const response = await fetch(`/ways/edit/${btnEditWay[0].id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataWayEdit)
  });
  const {way} = await response.json();
  window.location = `http://localhost:3000/ways/${way.id}`;
}


// const coordInfo = document.getElementsByClassName('coordInfo');
// const arr5 = coordInfo[0].id
// const obj = {start: arr5.split('/')[0].replace('_', ', '), end: arr5.split('/')[1].replace('_', ', ')}

// console.log(obj) // нам нужна подобная строка формата "56.33821041, 36.74362897"


// const timeFill = setInterval(() => {
//   const inputFill = [...document.getElementsByClassName('ymaps-2-1-79-route-panel-input__input')];
//   if (inputFill[0] && inputFill[1]) {
//     inputFill[0].value = obj.start
//     inputFill[1].value = obj.end

//     // let xEdit, yEdit;
//     // // console.log(inputEdit[0].value)
//     // xEdit = inputEdit[0].value.split(',').map(el=> parseFloat(el));
//     // if (!isNaN(xEdit[0])) arrCoordEdit.push(xEdit);
//     //   if (inputEdit.length && inputEdit[1].value !== `<empty string>` && inputEdit[1].value !=='') {
//     //     yEdit = inputEdit[1].value.split(',').map(el=> parseFloat(el));
//     //     if (yEdit[0]) arrCoordEdit.push(yEdit);
//         clearInterval(timeFill);
//     //     btnEditWay[0]?.addEventListener('click', () => {
//     //       editEntryesWay(arrCoordEdit);
//     //     })
//     //   }
//   }
// }, 100);
