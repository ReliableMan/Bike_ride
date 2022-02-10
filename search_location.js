const arr = [];
const time = setInterval(() => {
  const input = [...document.getElementsByClassName('ymaps-2-1-79-route-panel-input__input')];
  if (input.length && input[0].value !== '<empty string>'
    && input[0].value !== '') {
    let x; let
      y;
    x = input[0].value.split(',').map((el) => parseFloat(el));
    if (!isNaN(x[0])) arr.push(x);
    if (input.length && input[1].value !== '<empty string>' && input[1].value !== '') {
      y = input[1].value.split(',').map((el) => parseFloat(el));
      if (y[0]) arr.push(y);
      clearInterval(time);
      let tochkaA = arr[0];
      let tochkaB = arr.pop();
      console.log(...tochkaA);
      console.log(...tochkaB);
    }
  }
}, 100);
