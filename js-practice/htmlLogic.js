const divAtt = document.body.firstElementChild;
alert(divAtt);

const ulAtt = document.body.lastElementChild;
const liAtt = document.body.lastElementChild.lastElementChild;

const table = document.getElementById("age-table");
document.querySelectorAll("#age-table label");



function clear(elem) {
    
    elem.innerHTML = "";

}

function createUlWithPrompt(){
    const ul = document.createElement("ul");
    document.body.append(ul);
    
    while (true) {
        const pormpt = prompt("Введите текст", null);

        const li = document.createElement("li");

        li.textContent = prompt;
        ul.append(li);

    }
}


function getAnimals(){
    const ul = document.getElementById("animals");
    const lis = ul.querySelectorAll("li");

    for(const li of lis) {
        const currentLi = li.getElementsByTagName("li").length;

        li.firstChild.data += `[${currentLi}]`

    }

    

}


function createTree(obj) {
  
  if (!obj || Object.keys(obj).length === 0) return null;

  const ul = document.createElement('ul');

  for (const [key, value] of Object.entries(obj)) {
    const li = document.createElement('li');
    li.textContent = key; 

    
    const children = createTree(value);
    if (children) {
      li.appendChild(children);
    }

    ul.appendChild(li);
  }

  return ul;
}

// ----------------------------Часы---------------------------------

  let timerId = null; 

    function updateClock() {
      const now = new Date();
      const timeString = now.toLocaleTimeString(); 
      document.getElementById('clock').textContent = timeString;
    }

    function clockStart() {
      
      if (timerId) return;

      updateClock(); 
      timerId = setInterval(updateClock, 1000);
    }

    function clockStop() {
      clearInterval(timerId);
      timerId = null; 
    }


    function showNotification(options) {

  const {
    top = 0,
    right = 0,
    html = '',
    className = ''
  } = options;


  const div = document.createElement('div');

  div.classList.add('notification');

  if (className) {
    div.classList.add(className);
  }

  div.style.position = 'fixed';
  div.style.top = top + 'px';
  div.style.right = right + 'px';
  div.innerHTML = html;

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1500);
}