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