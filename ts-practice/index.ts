const name:string = "Egor";
const age:number = 25;
const isAdmin:boolean = true;
const arrNumber:number[] =[1,2,3,4,5];
const films:string[] = ["One","Two","Three"];

function add(a:number,b:number):number{

    return a + b;

}

function welcome(name:string = "Egor"):string{

    return `Привет ${name}`;
}

let userId: string|number;
userId = 5;
console.log(typeof userId);

userId = "Hi"
console.log(typeof userId);

function processUserId(id:number | string):void{
    if(typeof id === "number") console.log(`ID: ${id * 10}`);
    else console.log(`ID: ${id.toUpperCase()}`);

}

const mixed:(string |number)[] = [1,2,3,"Egor"];

interface Product extends ElectronicDevice {
    readonly id:number;
    name:string;
    price:number;
    category?:string;
}
interface ElectronicDevice {
    warrantyYears:number;

}


const laptop:Product = {
    id:1,
    name:"Hp",
    price:2000,
    warrantyYears:5,
}

type Coordinats = {x:number, y:number} | [number, number];

function distance(coord:Coordinats):number {
    

    if(Array.isArray(coord)){
        const [x,y] = coord;
        return Math.sqrt(x * x + y * y);
    }else {

        return Math.sqrt(coord.x**2 +coord.y**2);
    }

}

interface Grades {
    [key:string]:number;

}
const studentGrades: Grades = {
  math: 90,
  science: 85,
  literature: 92
};

function grad(obj:Grades):number {
    let value:number = 0;
    const grades = Object.values(obj);
    for(let gradue of grades) {
        value += gradue;

    }

    return value / grades.length;

}


function formatDate(obj:Date | string):string {
    let d:Date;
    if(typeof obj === "string"){

       d = new Date(obj);
       
    }else {
        d = obj;
    }
  const day = String(d.getDate());
  const month = String(d.getMonth() + 1);
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;

}

type Counter = {
    ():number;
    increment():void;
    reset():void;

}

function wrapInArr<T>(arg:T):T[] {
    const arr = [];
    arr.push(arg);
    return arr;
    
}

function findFirst<T>(arr:T[], func:(item: T) => boolean): T | undefined {
   
    for(const item of arr) {
       if(func(item)) return item
    }
    return undefined;
}

interface Stack<T>{
    push(item: T): void;
    pop():T | undefined;
    peek():T | undefined;
    
}

class ArrayStack<T extends Record<string, any>> implements Stack<T> {
  private storage: T[] = [];
  
  push(item: T): void {
    this.storage.push(item);
  }
  
  pop(): T | undefined {
    return this.storage.pop();
  }
  
  peek(): T | undefined {
    return this.storage[this.storage.length - 1];
  }
}

function createUser(name: string, age: number, isAdmin: boolean) {
  return { name, age, isAdmin, createdAt: new Date() };
}

type User = ReturnType<typeof createUser>;
type CreateUserParams = Parameters<typeof createUser>;

function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function processValue(val: string | null) {
  if (isNotNull(val)) {
    console.log(val.toUpperCase()); 
  } else {
    console.log("нет значения");
  }
}

export interface Users{
    name:string;
    id:number | string;
}

async function fetchJson<T>(url:string):Promise<T> {
    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error(`Ошибка ${response.status}`);
        const data = await response.json();

        return data;

    }catch(error:unknown) {

        if(error instanceof Error) throw new Error(error.message);
       throw error;
    
    }
   
}

interface User1 {
  id: number;
  name: string;
}
interface Post {
  title: string;
}

async function fetchUser(id: number): Promise<User1> {
  return { id, name: "User " + id };
}

async function fetchPosts(userId: number): Promise<Post[]> {
  return [{ title: "Post 1" }, { title: "Post 2" }];
}

async function loadUserData(userId: number): Promise<{ user: User1; posts: Post[] }> {
  const [user, posts] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId)
  ]);
  return { user, posts };
}

async function readFile(path: string): Promise<string> {
  if (path === "") throw new Error("Пустой путь");
  return "содержимое файла";
}

async function main() {
  try {
    const data = await readFile("");
    console.log(data);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Ошибка:", e.message);
    } else if (typeof e === "string") {
      console.error("Ошибка:", e);
    } else {
      console.error("Неизвестная ошибка");
    }
  }
}
main();


class Deferred<T> {
  promise: Promise<T>;
  resolve!: (value: T | PromiseLike<T>) => void;
  reject!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function test() {
  const d = new Deferred<string>();
  setTimeout(() => d.resolve("успех"), 1000);
  const result = await d.promise;
  console.log(result); 
}
test();