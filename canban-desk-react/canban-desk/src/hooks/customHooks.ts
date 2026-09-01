import { useEffect, useState } from "react";
import { openDb } from "../db/indexedDb";

export function useDebounce<T>(value:T, time:number) {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {

        const timer = setTimeout(() => setDebounceValue(value), time);

        return () => clearTimeout(timer);

    }, [value, time])

    return debounceValue;
}

export function useFetch(url:string) {

    const [data, setData] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(()=>{

        setloading(true);
        setError(null);
        
        const fetchData = async ()=> {
            try{
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error (`Error ${response.status}`);
                   
                }
                const data = await response.json();
                setData(data);
            } catch(error:any) {
                setError(error.message);
            }finally {
                setloading(false);
            }   
        }

        fetchData();
    }, [url])

    return {
        data,
        loading,
        error,
    }
}

export function useIndexedDb<T>() {

    async function add(value:T) {
        const db = await openDb();
        const transaction = db.transaction('todos', 'readwrite');
        const store = transaction.objectStore('todos');
        store.add(value);
    }
    async function get(id:number) {
        const db = await openDb();
        const transaction = db.transaction('todos', 'readonly');
        const store = transaction.objectStore('todos');
        return store.get(id);
    }
    async function update(value:T,) {
        const db = await openDb();
        const transaction = db.transaction('todos', 'readwrite');
        const store = transaction.objectStore('todos');
        store.put(value);
    }
    async function remove(id:number) {
        const db = await openDb();
        const transaction = db.transaction('todos', 'readwrite');
        const store = transaction.objectStore('todos');
        store.delete(id);
    }

    return { add, get, update, remove };
}