// ----------------------------------- ОСНОВЫ JS -----------------------------------------------------

alert("Я JavaScript");
const admin = "Egor";
const name = "Jon";
alert(admin);
let currentUser;
let ourPlanet;

function getName(){
const promptName = prompt("Как вас зовут", null);
alert(promptName);

}
getName();

function ifEcmaScript() {
    const answer = prompt("Какое официальное название JavaScript?", "");
    if (answer === null) return; 
    if (answer.trim().toLowerCase() === "ecmascript") {
        alert("Верно!");
    } else {
        alert("Неверно. Правильный ответ – ECMAScript.");
    }
}
ifEcmaScript();

function getNumberForExamination() {
    const promptNumber = +prompt("Введите число", null);
    if (promptNumber > 0) {
        return alert(1);
    } else if (promptNumber < 0) {
        return alert(-1);
    }
    return alert(0);
}
getNumberForExamination();

let result = (a + b) < 4 ? "Мало":"Много";

let message = (login == 'Сотрудник') ? 'Привет' :
  (login == 'Директор') ? 'Здравствуйте' :
  (login == '') ? 'Нет логина' :
  '';

  const age = 15;

if(age >= 14 && age <= 90) return true;
if(!(age >= 14 && age <= 90)) return false;

function confirmAdmin() {
    const login = prompt("Введите логин", null);
    if(login.toLowerCase() === "admin") {
        const password = +prompt("Введите пароль",null)
        return password;
    }
    if(login ==="" || login === null) return alert("Отменено");
   
    return alert("Я вас не знаю");

}
let arr = [5, 12, 8, 3, 0, 7, 4, 10, 6, 2]; 
let res = 0; 

for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        res += arr[i];
    }
}
console.log(res); 
let i = 0; 
while( i < 3){

    alert(i);
    i++;
}
let num;

do {
  num = prompt("Введите число больше 100?", 0);
} while (num <= 100 && num);

function simplenumbers(n) {
      nextNum:
    for (let i = 2; i <= n; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) continue nextNum;
        }
        console.log(i);
    }
}
//--------------------------------ОСНОВЫ JS -----------------------------------------------------------

//--------------------------------Типы данных----------------------------------------------------
function getMaxSubSum(arr) {
    let sum = 0;
    let maxSubArr = 0;
    for(let num of arr) {
       
        sum += num;
        Math.max(maxSubArr, sum);
        if(maxSubArr < 0) return 0;
        

    }
        return sum;
}



function aclean(arr){
    const withaoutAnagramm = new Map();
    for(const word of arr){
        const sorted = word.toLowerCase().split("").sort().join("");
        withaoutAnagramm.set(sorted,word);

    }
    return [...withaoutAnagramm];

}

function sumSallary(obj){
    let sum = 0;
    for(const value of Object.values(obj)){
        sum += value;

    }

    return sum;

}

function getLocalDay(date) {

    const day = date.getDay();
    if(day === 0) day = 7;

    return day;
}

function getSecondsToday() {
  let now = new Date();

  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let res = now - today; 
  return Math.round(res / 1000); 
}

let user = {
  name: "Василий Иванович",
  age: 35
};

let user2 = JSON.parse(JSON.stringify(user));


alert( JSON.stringify(meetup, function replacer(key, value) {
   return (key != "" && value == meetup) ? undefined : value;
}));

//-------------------------Продвинутая работа с функциями---------------------------------------

function sumTo(n){
    if (n === 1 ) return 1

   return n+ sumTo(n - 1);

}

function factorial(n){
    if(n === 1) return 1
    return n * factorial(n - 1);
}

function fibanachi(n){
     if( n === 1) return 1 

    return fibanachi(n - 1) + fibanachi(n - 2);

}

function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };

}function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

function byField(name){
  return (a, b) => a[name] > b[nwame] ? 1 : -1;
}

function makeCounter() {
  let count = 0;

  function counter() {
    return count++;
  }

  counter.set = value => count = value;

  counter.decrease = () => count--;

  return counter;
}

function printNumbers(from, to){
    setTimeout(function time(){
        console.log(from);
            if(from < to) setTimeout(time(),1000)
                from++;
    },1000)
}   


function spy(func) {

    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }

    wrapper.calls = [];
    return wrapper;
}

function deley(func, time){
        return function timeout(...args) {

            return setTimeout(()=> func.apply(this, args), time);
        }
}

function debounce(func, delay) {
    let timer;

    return function(...args) {
      
        clearTimeout(timer);

       
       timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function throttle(func, delay) {
    let isThrottled = false; 

    return function(...args) {
        if (isThrottled) return; 

    
        func.apply(this, args);
        isThrottled = true; 

        setTimeout(() => {
            isThrottled = false; 
        }, delay);
    };
}

const { use } = require("react");

const number = +prompt('Введите число между 0 и 3', '');
switch (number) {
    case 0:
        alert('Вы ввели число 0');
        break;
    case 1:
        alert('Вы ввели число 1');
        break;

    case 2:
    case 3:
        alert('Вы ввели число 2 или 3');
        break;

    default:
        break;
}

if(browser ==="Edge") {

    alert("You've got the Edge!")
}  else if(browser ==="Chrome" || browser ==="FireFox" || browser ==="Safari" || browser ==="Opera")  alert( 'Okay we support these browsers too' );
  alert( 'We hope that this page looks ok!' );

function checkAge(age) {
  let result = (age > 18) ?  true : confirm('Родители разрешили?');
}
function min(a, b){
    if(a > b) return b

    return a;

}

function pow(a, b){

    return a ** b;
}

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Вы согласны?",
  () =>  alert("Вы согласились."),
  () =>  alert("Вы отменили выполнение.")
);

// --------------------------------------------------------obj

const user = {
    name:"John",
    age:22,
    surname:"Petro",

};

use.name = "Pete";
delete user.name;

function isEmpty(obj){
    for(let key in obj) return false;

    return true;
}

function summSalaries(obj){
    let summ = 0;
    for(let key in obj) {

            summ += obj[key]
    }
        return summ;
}

function multiplyNumeric(obj){
    
    for(let key in obj){
        if(typeof obj[key] === "number") obj[key] *= 2;

    }

}

let calculator = {
  // ... ваш код ...
    a: 0,
    b: 0,
  read(){
    const a = +prompt("vvedite chislo",null);
    const b = +prompt("vvedit echislo", null);
    this.a = a;
    this.b = b;
  },
  sum(){
    return this.a + this.b;
  },
  mul(){
    return this.a * this.b;

  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

function Calculator() {

  this.read = function() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  };

  this.sum = function() {
    return this.a + this.b;
  };

  this.mul = function() {
    return this.a * this.b;
  };
}

function Accumulator(value){
    this.value = value;
    this.read = function(){
        const inputValue = +prompt("vvedite novoe znach", null);
        this.value = inputValue;
    }
}

// ---------------------------ТИпы данных   

function getSum(){
    const firstNumber = +prompt("Введите первое число", null);
    const secondNumber = +prompt("Введите второе число", null);
    return Math.sum(firstNumber,secondNumber);
}

function readNumber() {
    while (true) {
        
        const value = prompt("Введите число", null);

        if (value === null || value.trim() === "") {
            return null;
        }
        
        const num = Number(value);

        if (isNaN(num)) {
            alert("error");
        } else {
        
            return num;
        }
    }
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function ucFirst(str){
    const changedStr = str[0].toUpperCase() + str.slice(1);
    return changedStr;

}

function checkSpam(str){
    if(str.toLowerCase().includes("xxx") || str.toLowerCase().includes("viagra")) return true;
    return false;
}
function extractCurrencyValue(str){
    let intValue = str.slice(1);
     return parseInt(intValue);
}

function truncate(str, strLength){
    return str.length > strLength  ?  str.slice(0, strLength - 1) + "...": str;

}

function camelize(word){
    return word.split("-").map((value, index) =>{
        if (index === 0 ) return value;
        else{
            return value[0].toUpperCase() + value.slice(1);
        }

    }).join('');
}

function copySorted(arr){
    const coppySorted = arr.filter((value) => typeof value === "string").sort();

    return coppySorted;
}

let arr = [5, 2, 1, -10, 8];

arr.sort((a,b) => b - a );

alert( arr ); // 8, 5, 2, 1, -10

function filterRange(arr, min, max){
    return arr.filter((value)=> value >= min && value <= max );
}

function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let value =


arr[i];

    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}

function Calc() {
    this.calculate = function(str) {
        
        const parts = str.split(" ");

        const a = parseFloat(parts[0]);
        const op = parts[1];
        const b = parseFloat(parts[2]);

        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
          
            default:  return NaN;
        }
    };
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ].reduce((acc, person) => {
     acc.push(person.name);
     return acc;
},[]);

function unique(arr){
    const uniqueValue = new Set();
    for(const value of arr) {

         unique.add(value);
    }
    return[...uniqueValue];
}

let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));

function sortByAge(arr){
    return arr.sort((a,b) => a.age - b.age)
}
function getAverageAge(arr) {
    return arr.reduce((acc, value) => {
            return acc += value.age
    },0) / arr.length;

}

let map = new Map();

map.set("name", "John");

let keys = map.keys();
let arrKeys = [...keys]

keys.push("more");

Function.prototype.defer = function(ms) {
    setTimeout(() => this(), ms)

}

Function.prototype.deferDebounce  = function(ms){

    return function(...args) {
        setTimeout(()=> this.call(this, args),ms);

    }
}

class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    super(name);
    this.created = Date.now();
  }
}

function deley(ms){

    return new Promise(res => setTimeout(res,ms))
}

async function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

async function loadJsAsync(url) {
    try{
        const response = await fetch(url);
        if(response.status === 200){
            const data = await response.json();}
        else{
            throw new Error(response.status);
        }
    }catch(err){
        console.log(err)
    }
    

}

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  const response =  await fetch(url)
    
      if (response.status == 200) {
        const data = await response.json();
        return data
      } else {
        throw new HttpError(response);
      }
    
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break;
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        
        alert("No such user, please reenter.");
      } else {
        
        throw err;
      }
    }
  }

  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();