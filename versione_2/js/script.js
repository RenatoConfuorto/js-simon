const cells = document.querySelectorAll('.cell');
const timer = document.getElementById('timer');
const resultDisplay = document.getElementById('result-display');

let time = 30;
time.innerText = time;
let timeInput = 30;

//generare 5 numeri casuali
const maxNumber = 99;
const numbers = [];
const userNumbers = [];

function randomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let counter = 0;
while(numbers.length < cells.length){
  const randomNumber = randomInteger(1, maxNumber);
  //controllare che il numero sia unico
  if(!numbers.includes(randomNumber)){
    numbers.push(randomNumber);
    //inserire il numero nella cella;
    cells[counter].value = randomNumber;
    cells[counter].classList.add('disabled');
    counter++;
  }
}

//ripulire le celle dopo 30 secondi
const clockFunction = setInterval(timerClock, 1000);

function timerClock(){
  time--;
  timer.innerText = time;
  if(time <= 0){
    clearInterval(clockFunction);
    clearCells();
  }
}

let takeInputIntv = null;
function clearCells(){
  for(let i = 0; i < cells.length; i++){
    cells[i].value = '';
    cells[i].setAttribute('placeholder', '?');
    cells[i].classList.remove('disabled');
  }
  //iniziare il cronometro
  timer.innerText = timeInput;
  //prelevare i numeri scritti dall'utente e controllarli
  takeInputIntv = setInterval(inputClockFunction, 1000);
}

function inputClockFunction(){
  timeInput--;
  timer.innerText = timeInput;
  if(timeInput <= 0){
    clearInterval(takeInputIntv);
    takeInput();
  }
}

function takeInput(){
  //prelevare i numeri dagli input
  for(let i = 0; i < cells.length; i++){
    //disabilitare le celle
    cells[i].classList.add('disabled');

    const currentNumber = parseInt(cells[i].value);
    userNumbers.push(currentNumber);

  }

  //controllare quanti numeri corretti sono stati inseriti
  const correctNumbers = checkSameArray(numbers, userNumbers)

  let result;
  if(correctNumbers === numbers.length){
    result = 'Hai indovinato tutti i numeri';
  }else if(correctNumbers === 0){
    result = 'Non ne hai azzeccato neanche uno';
  }else{
    result = `Numeri indovinati ${correctNumbers}/${numbers.length}`;
  }

  resultDisplay.innerText = result;
}

//paragonare i due array

function checkSameArray(firstArray, secondArray){
  const positiveMatch = [];
  //mettere un ordine negli array
  firstArray.sort();
  secondArray.sort();

  //controllare gli elementi degli array
  for(let i = 0; i < firstArray.length; i++){
    if(firstArray[i] === secondArray[i]){
      positiveMatch.push(firstArray[i]);
    }
  }
  console.log('Numeri corretti', positiveMatch);
  return positiveMatch.length;
}
