const wayImage = document.getElementById('wayImage')
const wayTitle = document.getElementById('wayTitle')
const wayCity = document.getElementById('wayCity')
const wayText = document.getElementById('wayText')

const btnNewWay = [...document.getElementsByClassName('btnNewWay')]

const arrCoord = []
const time = setInterval(() => {
  const input = [...document.getElementsByClassName('ymaps-2-1-79-route-panel-input__input')];
  if (input.length && input[0].value !== `<empty string>` 
  && input[0].value !=='' ) {
    let x, y;
    x = input[0].value.split(',').map(el=> parseFloat(el))
    if (!isNaN(x[0])) arrCoord.push(x)
      if (input.length && input[1].value !== `<empty string>` && input[1].value !=='') {
        y = input[1].value.split(',').map(el=> parseFloat(el))
        if (y[0]) arrCoord.push(y)
        clearInterval(time);
        btnNewWay[0]?.addEventListener('click', () => {
          createEntryesWay(arrCoord)
        })

        // console.log(arr);
      }
  }
}, 100);



async function createEntryesWay(arrCoord = []) {
  const distance = [...document.getElementsByClassName('ymaps-2-1-79-transport-pin__text')]
  const dataNewWay = {
    wayTitle: wayTitle.value,
    wayCity: wayCity.value,
    wayImage: wayImage.value,
    wayText: wayText.value,
    xy1: arrCoord[0],
    xy2: arrCoord.pop(),
    distance: distance[0]?.textContent || 'Расстояние неопределено'
  }
  console.log(dataNewWay)
  const response = await fetch('/ways/new/add', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataNewWay)
  });
  const {newWay} = await response.json();
  console.log(newWay)
  window.location = `http://localhost:3000/ways/${newWay.id}`

}
