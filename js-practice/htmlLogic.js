const divAtt = document.body.firstElementChild;
alert(divAtt);

const ulAtt = document.body.lastElementChild;
const liAtt = document.body.lastElementChild.lastElementChild;

const table = document.getElementById("age-table");
document.querySelectorAll("#age-table label");

football();

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


const getBut = document.getElementById("button");
const getDiv = document.getElementById("text");
getBut.addEventListener("click",() =>{
  getDiv.style.display = "none";

})


getBut.addEventListener("click",()=> {
  getBut.style.display = "none";
});


const field = document.getElementById("field");
const ball = document.getElementById("ball");

field.addEventListener("click", ()=>{


})


function spanChanger(){

  const menuList = document.getElementById("menu");
  const ul = menuList.children[0];
  ul.style.display ="none";

  menuList.addEventListener("click", ()=>{
    if(ul.style.display ==="none" ||ul.style.display ==="") ul.style.display ="block"
    else ul.style.display ="none";

  });

}

function football(){

    const ball = document.getElementById("ball");
    const field = document.getElementById("field");

    field.addEventListener('click',(event) =>{
      const fieldCoordinates = field.getBoundingClientRect();
      const ballX = event.clientX - fieldCoordinates.left;
      const ballY = event.clientY - fieldCoordinates.right;
      const ballW = ball.offsetWidth;
      const ballH = ball.offsetHeight;
      const fieldW = field.clientWidth;
      const fieldH = field.clientHeight;


      let left = ballX - ballW / 2;
      let top  = ballY - ballH / 2;

      left = Math.max(0, Math.min(left, fieldW - ballW));
      top  = Math.max(0, Math.min(top, fieldH - ballH));

      ball.style.left = left + 'px';
      ball.style.top  = top + 'px';

      
    })

    
}


function closeBtnForList() {
  const animalBtn0 = document.getElementById("horse-btn");
  const animalBtn1 = document.getElementById("donkey-btn");
  const animalBtn2 = document.getElementById("cat-btn");

  animalBtn0.addEventListener("click", function() {
    const findDiv = document.querySelector('.pane-horse'); 
    if (findDiv) findDiv.style.display = "none";
  });

  animalBtn1.addEventListener("click", function() {
    const findDiv = document.querySelector('.pane-donkey');
    if (findDiv) findDiv.style.display = "none";
  });

  animalBtn2.addEventListener("click", function() {
    const findDiv = document.querySelector('.pane-cat');
    if (findDiv) findDiv.style.display = "none";
  });
}

document.addEventListener('DOMContentLoaded', closeBtnForList);


function deleteList(){
  const container = document.getElementById("container");

  container.addEventListener("click",(event) =>{
      const target = event.target.closest(".pane");

         target.remove();

  });
  
}

function treeLogic(){
  const tree = document.getElementById("tree");
  tree.addEventListener("click", (event) => {
      
    const li = event.target.closest('li');
    if(!li) return
    const findUl = li.querySelector('ul');
    if(!findUl) return

    if(findUl.style.display ==="none") findUl.style.display ="";
    else  findUl.style.display ==="none"
    
  })

}


function sortTable() {
  const grid = document.getElementById("grid");
  const tbody = grid.tBodies[0];
  const dirs = []; 

  grid.addEventListener("click", (event) => {
    const th = event.target.closest("th");
    if (!th) return;

    const index = th.cellIndex;        
    const type = th.dataset.type;        
    const rows = [...tbody.rows];


    dirs[index] = dirs[index] === "asc" ? "desc" : "asc";
    const dir = dirs[index];

    rows.sort((a, b) => {
      let valA = a.cells[index].textContent.trim();
      let valB = b.cells[index].textContent.trim();
      switch (type) {
        case "number":
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
          break;
        case "string":
        default:
  
          break;
      }
      if (valA === valB) return 0;
      const result = valA > valB ? 1 : -1;
      return dir === "asc" ? result : -result;
    });

  
    rows.forEach(row => tbody.appendChild(row));
  });
}

const contents = document.getElementById('contents');


contents.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return; 
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
  const userConfirm = confirm('Вы уверены, что хотите покинуть страницу?');
  if (!userConfirm) {
    
    event.preventDefault();
    
  }
});


    const container = document.getElementById('editable');


    function startEditing() {

      const content = container.innerHTML;

      const textarea = document.createElement('textarea');
      textarea.value = content; 

      container.replaceWith(textarea);

      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);


      function finishEditing() {
        const newContent = textarea.value;
        const newDiv = document.createElement('div');
        newDiv.id = 'editable'; 
        newDiv.innerHTML = newContent; 

        textarea.replaceWith(newDiv);
        newDiv.addEventListener('click', startEditing);
      }


      textarea.addEventListener('blur', finishEditing);

     
      textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); 
          textarea.blur(); 
        }
      });
    }

const select = document.getElementById('genres');

const selectedOption = select.options[select.selectedIndex];
console.log(`Выбрано: значение="${selectedOption.value}", текст="${selectedOption.text}"`);

const newOption = document.createElement('option');
newOption.value = 'classic';
newOption.textContent = 'Classic';
select.appendChild(newOption);

select.value = 'classic';





 function populate() {
      while (true) {
        const bottom = document.documentElement.getBoundingClientRect().bottom;
    
        if (bottom > document.documentElement.clientHeight + 100) break;
        document.body.innerHTML += `<p>${new Date().toLocaleString()}</p>`;
      }
    }

    window.addEventListener('scroll', populate);
    populate();

    
    function getDescription() {
    const div = document.getElementById("test");
    const description = document.getElementById("description");

    div.addEventListener("mouseover", (event) => {
        const target = event.target.closest("p");
        if (!target) return;

        description.textContent = target.dataset.tooltip;
        description.classList.add("tooltip-visible");
    });

    div.addEventListener("mouseout", (event) => {
        const target = event.target.closest("p");
        if (!target) return;

        description.classList.remove("tooltip-visible");
    });

    div.addEventListener("mousemove", (event) => {
        if (description.classList.contains("tooltip-visible")) {
            description.style.left = event.clientX + 15 + "px";
            description.style.top = event.clientY + 15 + "px";
        }
    });
}

const slider = document.getElementById("slider");
const thumb = slider.querySelector(".thumb");

let isDragging = false;

thumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  e.preventDefault(); 
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return; 

  const sliderRect = slider.getBoundingClientRect();
  let newLeft = e.clientX - sliderRect.left; 


  if (newLeft < 0) newLeft = 0;
  if (newLeft > sliderRect.width) newLeft = sliderRect.width;

  thumb.style.left = newLeft + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY; 
    const viewportHeight = window.innerHeight; 
    const fullHeight = document.documentElement.scrollHeight; 

    if (scrollTop + viewportHeight >= fullHeight) {
      const now = new Date();
      const dateTimeString = now.toLocaleString(); 
      const newElement = document.createElement("p");
      newElement.textContent = dateTimeString;
      document.body.appendChild(newElement);
    }
  });

  function runOnKeys(func, code1, code2) {
    const pressedKeys = new Set();

    document.addEventListener("keydown", (event) => {
        pressedKeys.add(event.code);
        if (pressedKeys.has(code1) && pressedKeys.has(code2)) {
            func();
        }
    });
}

const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;                
  const windowHeight = window.innerHeight;        


  if (scrolled > windowHeight) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

scrollBtn.addEventListener('click', () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const mouse = document.getElementById('mouse');
const step = 10; 


mouse.addEventListener('focus', () => {
  console.log('Виртуальная мышь в фокусе, управляйте стрелками');
});


document.addEventListener('keydown', (e) => {

  if (document.activeElement !== mouse) return;

  const currentLeft = parseFloat(getComputedStyle(mouse).left) || 0;
  const currentTop = parseFloat(getComputedStyle(mouse).top) || 0;

  switch (e.key) {
    case 'ArrowUp':
      mouse.style.top = (currentTop - step) + 'px';
      e.preventDefault(); 
      break;
    case 'ArrowDown':
      mouse.style.top = (currentTop + step) + 'px';
      e.preventDefault();
      break;
    case 'ArrowLeft':
      mouse.style.left = (currentLeft - step) + 'px';
      e.preventDefault();
      break;
    case 'ArrowRight':
      mouse.style.left = (currentLeft + step) + 'px';
      e.preventDefault();
      break;
  }
});


mouse.addEventListener('click', () => mouse.focus());

    document.body.addEventListener('click', (event) => {
      const viewDiv = event.target.closest('#view');
      if (!viewDiv) return; // клик не по #view

      const textarea = document.createElement('textarea');
      textarea.className = 'edit';
      textarea.value = viewDiv.innerHTML; 
      viewDiv.replaceWith(textarea);
      textarea.focus();

      const save = () => {
        const newDiv = document.createElement('div');
        newDiv.id = 'view';
        newDiv.className = 'view';
        newDiv.innerHTML = textarea.value; 
        textarea.replaceWith(newDiv);
      
      };
      textarea.addEventListener('blur', save, { once: true });
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          textarea.blur(); 
        }
      });
    });

     const form = document.forms.calculator;
    const moneyInput = form.money;
    const monthsSelect = form.months;
    const interestInput = form.interest;

    const moneyBefore = document.getElementById('money-before');
    const moneyAfter = document.getElementById('money-after');
    const heightAfter = document.getElementById('height-after');

    function calculate() {
      let money = parseFloat(moneyInput.value);
      let interest = parseFloat(interestInput.value);
      const months = parseInt(monthsSelect.value);

      if (isNaN(money) || money < 0) money = 0;
      if (isNaN(interest) || interest < 0) interest = 0;

      let result;
      if (money === 0 || months === 0) {
        result = 0;
      } else {
        result = money * Math.pow(1 + interest / 100 / 12, months);
      }

      moneyBefore.textContent = money.toFixed(2) + ' ₽';
      moneyAfter.textContent = result.toFixed(2) + ' ₽';

      if (money > 0) {
        heightAfter.style.height = (result / money) * 100 + 'px';
      } else {
        heightAfter.style.height = '0px';
      }
    }

    form.addEventListener('input', calculate);
    form.addEventListener('change', calculate);  // для select

    calculate();
    function preloadImages(sources, callback) {
  let count = 0;
  const total = sources.length;

  if (total === 0) {
    callback();
    return;
  }

  function onImageReady() {
    count++;
    if (count === total) {
      callback();
    }
  }

  for (let src of sources) {
    let img = new Image();
    img.onload = onImageReady;
    img.onerror = onImageReady;
    img.src = src;
  }
}

function showPrompt(html, callback) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5); display: flex; align-items: center;
    justify-content: center; z-index: 1000;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    background: #fff; padding: 20px; border-radius: 5px;
    min-width: 300px; box-shadow: 0 0 10px rgba(0,0,0,0.3);
  `;

  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = html;
  container.appendChild(messageDiv);

  const input = document.createElement('input');
  input.type = 'text';
  input.style.cssText = 'width: 100%; margin-top: 10px; padding: 5px;';
  container.appendChild(input);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.cssText = 'margin-top: 15px; text-align: right;';
  const okBtn = document.createElement('button');
  okBtn.textContent = 'OK';
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Отмена';
  cancelBtn.style.marginLeft = '10px';
  buttonsDiv.appendChild(okBtn);
  buttonsDiv.appendChild(cancelBtn);
  container.appendChild(buttonsDiv);

  overlay.appendChild(container);
  document.body.appendChild(overlay);

  function close(value) {
    document.body.removeChild(overlay);
    callback(value);
  }

  input.focus();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') close(input.value);
    if (e.key === 'Escape') close(null);
  });

  okBtn.addEventListener('click', () => close(input.value));
  cancelBtn.addEventListener('click', () => close(null));

  const focusable = container.querySelectorAll(
    'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
}