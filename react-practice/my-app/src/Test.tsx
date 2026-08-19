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
