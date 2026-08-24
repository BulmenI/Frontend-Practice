export function Profile10() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Аклилу Лемма"
    />
  );
}


export  function Profile1() {
  return(
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Кацуко Сарухаси" />
     );
    
}

export  function Bio() {
  return ( 
  <>
    <div className="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p className="summary">
      <br> You can find my thoughts here.</br>
      <b>And <i>pictures </i></b><i>of scientists!</i> 
    </p>
  </>
  
  );
}

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export  function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

const person1 = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  },
  url:"https://i.imgur.com/7vQD0fPs.jpg",
};

export default function TodoList1() {
  return (
    <div style={person1.theme}>
      <h1>{person1.name}'s Todos</h1>
      <img
        className="avatar"
        src={person1.url}
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

const baseUrl = 'https://i.imgur.com/';
const person2 = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export function TodoList2() {
  return (
    <div style={person2.theme}>
      <h1>{person2.name}'s Todos</h1>
      <img
        className="avatar"
        src={baseUrl + person2.imageId + person2.imageSize +".jpg"}
        alt={person2.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
interface ProfileProps{
  imageId:string;
  name:string;
  profession:string;
  awards:string[];
  discovery:string;
  imageSize?:number;
}
function getImageUrl(imageId:string, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}:ProfileProps) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profession:</b> {profession}</li>
        <li>
          <b>Awards: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

export  function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
        discovery="polonium (chemical element)"
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
      />
      <Profile
        imageId='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemist'
        discovery="a method for measuring carbon dioxide in seawater"
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
      />
    </div>
  );
}

function Avatar({ person, size }) {
  let sizeChange = "s";
  if(size > 90) sizeChange ="b";

  return (
    <img
      className="avatar"
      src={getImageUrl(person, sizeChange)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export  function Profiless() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}

function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export  function Profile() {
  return (
    <div>
      <Card>
        <h1>Photo</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>About</h1>
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}

function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} 
      
      {isPacked ?'✅' : "❌"};
    </li>
  );
}

export  function PackingList() {
  return (
    <section>
      <h1>Список вещей Салли Райд</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Космический скафандр" 
        />
        <Item 
          isPacked={true} 
          name="Шлем с золотым листом" 
        />
        <Item 
          isPacked={false} 
          name="Фотография Тэма" 
        />
      </ul>
    </section>
  );
}


function Drink({ name }) {
    const drink = {
      chast:"",
      coffe:"",
      age:"",
    }
    if(name === "tea") {
      drink.chast = 'leaf';
      drink.coffe = '15–70 мг/чашка';
      drink.age = '4,000+ лет'
    }
    else if( name === "coffee"){
      drink.chast = 'bean';
      drink.coffe = '80–185 мг/чашка';
      drink.age = '1,000+ лет'
    }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Часть растения</dt>
        <dd>{name.chast}</dd>
        <dt>Содержание кофеина</dt>
        <dd>{name.coffe}</dd>
        <dt>Возраст</dt>
        <dd>{name.age}</dd>
      </dl>
    </section>
  );
}

export  function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}

export default function List() {

  const chemics = people.filter((person)=>person.name === "химик" );
  const noChemics = people.filter((person) => person.name !== "химик")ж
  const listItems =chemics.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession}.
        Достижение: {person.accomplishment}
      </p>
    </li>
  );
  const listItems1 = noChemics.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession}.
        Достижение: {person.accomplishment}
      </p>
    </li>
  );
  
  return (
    <article>
      <h1>Ученые</h1>
      <ul>{listItems}</ul>
      <ul>{listItems1}</ul>
    </article>
  );
}


import { useState, useRef } from 'react';

 function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const timer = useRef(null);
  
  let timeoutID = null;

  function handleSend() {
    setIsSending(true);
    timer.current = setTimeout(() => {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timer.current);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          Undo
        </button>
      }
    </>
  );
}



import { useState, useRef } from 'react';

export default function Toggle() {
  const [status, setStatus] = useState(false);

  return (
    <button onClick={() => {
      setStatus(prev => !prev)
    }}>
      {status ? 'On' : 'Off'}
    </button>
  );
}

import { useRef } from 'react';

let timeoutID;

function DebouncedButton({ onClick, children }) {
  const timer = useRef(null);
  return (
    <button onClick={() => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('Spaceship launched!')}
      >
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Soup boiled!')}
      >
        Boil the soup
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Lullaby sung!')}
      >
        Sing a lullaby
      </DebouncedButton>
    </>
  )
}

import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const savedText = useRef(null);
  function setExampleText(e) {
    setText(e);
    savedText.current = e;
  }
  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + savedText.current);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={e => setExampleText(e.target.value)}
      />
      <button
        onClick={handleSend}>
        Send
      </button>
    </>
  );
}
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    if(isPlaying){
      video.current.play();
    }else{
      video.current.pause();
    }
    
  }
   
  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <video ref ={video} width="250">
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}

import {useRef} from "react";
export default function Page() {
  const ref = useRef(null);
  ref.current.focus();
  return (
    <>
      <nav>
        <button>Search</button>
      </nav>
      <input
        placeholder="Looking for something?"
        ref={ref}
      />
    </>
  );
}

import { useState, useRef } from 'react';

export default function CatFriends() {
  const [index, setIndex] = useState(0);
  const ref1 =useRef(null);

  
  return (
    <>
      <nav>
        <button onClick={() => {
          if (index < catList.length - 1) {
            setIndex(index + 1);
          } else {
            setIndex(0);
          }
      ref1.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          }); 
        }}>
          Next
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li key={cat.id}>
              <img
                ref ={ref1}
                className={
                  index === i ?
                    'active' :
                    ''
                }
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://loremflickr.com/250/200/cat?lock=' + i
  });
}

import { useEffect, useRef } from 'react';

export default function MyInput({ shouldFocus, value, onChange }) {
  const ref = useRef(null);

  // TODO: вызывайте focus() только если shouldFocus равно true.
  useEffect(() => {
    if(shouldFocus === true){
      ref.current.focus();
    }
    
  }, [shouldFocus]);

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1);
      
    }

    const timer = setInterval(onTick, 1000);

     return () => clearInterval(timer);
  }, []);

  return <h1>{count}</h1>;
}

import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let status = false;
    setBio(null);
    fetchBio(person).then(result => {
      if(!status) setBio(result);
      
      return () => status = true
    });
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Загрузка...'}</i></p>
    </>
  );
}
import { useState, useEffect } from 'react';

export default function Form() {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
    sendMessage(message);
  }

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <button onClick={() => {
          setMessage('');
          setShowForm(true);
        }}>
          Open chat
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ''}>
        Send
      </button>
    </form>
  );
}

function sendMessage(message) {
  console.log('Sending message: ' + message);
}

import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      if (canMove) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [canMove]);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)} 
        />
        The dot is allowed to move
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
import { useState, useEffect } from 'react';
import { fetchData } from './api.js';

export default function Page() {
  const [planetList, setPlanetList] = useState([])
  const [planetId, setPlanetId] = useState('');

  const [placeList, setPlaceList] = useState([]);
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchData('/planets').then(result => {
      if (!ignore) {
        console.log('Fetched a list of planets.');
        setPlanetList(result);
        setPlanetId(result[0].id); 
      }
    });
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    if (planetId === '') {
      
      return;
    }

    let ignore = false;
    fetchData('/planets/' + planetId + '/places').then(result => {
      if (!ignore) {
        console.log('Fetched a list of places on "' + planetId + '".');
        setPlaceList(result);
        setPlaceId(result[0].id); 
      }
    });
    return () => {
      ignore = true;
    }
  }, [planetId]);

  return (
    <>
      <label>
        Pick a planet:{' '}
        <select value={planetId} onChange={e => {
          setPlanetId(e.target.value);
        }}>
          {planetList.map(planet =>
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          )}
        </select>
      </label>
      <label>
        Pick a place:{' '}
        <select value={placeId} onChange={e => {
          setPlaceId(e.target.value);
        }}>
          {placeList.map(place =>
            <option key={place.id} value={place.id}>{place.name}</option>
          )}
        </select>
      </label>
      <hr />
      <p>You are going to: {placeId || '???'} on {planetId || '???'} </p>
    </>
  );
}

import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [increment]);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Every second, increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
    </>
  );
}
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(connectedRoomId => {
    showNotification('Welcome to ' + connectedRoomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      setTimeout(() => {
        onConnected(roomId);
      }, 2000);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}

import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('✅ Creating an interval');
    const id = setInterval(() => {
      console.log('⏰ Interval tick');
      setCount( prev => prev + 1);
    }, 1000);
    return () => {
      console.log('❌ Clearing an interval');
      clearInterval(id);
    };
  }, [count]);

  return <h1>Counter: {count}</h1>
}
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ options }) {
  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connectionObject = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connectionObject.connect();
    return () => connectionObject.disconnect();
  }, [roomId, serverUrl]);

  return <h1>Welcome to the {options.roomId} room!</h1>;
}

// Write your custom Hook in this file!
export function useCounter(){
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count
}

export function useDebounce (value, time){

  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, time);
    return () => clearTimeout(id);
  }, [value, time]); 
}

function useInterval(tick, time) {
  useEffect(() => {
    const id = setInterval(tick, time);
    return () => clearInterval(id);
  }, [tick, time]);
}
 function useInterval(callback, delay) {
  const tick = useEffectEvent(callback);
  useEffect(() => {
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
