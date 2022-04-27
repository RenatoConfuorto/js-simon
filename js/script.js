const cells = document.querySelectorAll('.cell');
const timer = document.getElementById('timer');

//generare 5 numeri casuali
const maxNumber = 5;
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
    cells[counter].innerText = randomNumber;
    counter++;
  }
}

//ripulire le celle dopo 30 secondi
setTimeout(clearCells, 3000);

function clearCells(){
  for(let i = 0; i < cells.length; i++){
    cells[i].innerText = '?';
  }
  //chiedere i numeri all'utente e controllare se i numeri sono corretti
  setTimeout(askNumbers, 1000);
}

function askNumbers(){
  let index = 0;
  while(userNumbers.length < cells.length){
    const askedNumber = parseInt(prompt(`Inserisci un numero presente nella tabella (${index +1}/${cells.length})`));

    if(!userNumbers.includes(askedNumber) && !isNaN(askedNumber)){
      userNumbers.push(askedNumber);
      index++;
    }
  }

  //controllare i numeri inseriti e dire se si ha indovinato
  const correctNumbers = checkSameArray(numbers, userNumbers);

  if(correctNumbers.length === numbers.length){
    console.log('Hai indovinato tutti i numeri');
  }else if(correctNumbers.length === 0){
    console.log('Non ne hai azzeccato neanche uno');
  }else{
    console.log(`Hai indovinato ${correctNumbers.length}/${numbers.length}`)
  }
}

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
  console.log(positiveMatch);
  return positiveMatch;
}
