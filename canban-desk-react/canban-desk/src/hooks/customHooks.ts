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

    async function add(value: T): Promise<void> {
        const db = await openDb();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("todos", "readwrite");
            const store = transaction.objectStore("todos");

            const request = store.add(value);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async function get(id: number): Promise<T | undefined> {
        const db = await openDb();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("todos", "readonly");
            const store = transaction.objectStore("todos");

            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async function update(value: T): Promise<void> {
        const db = await openDb();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("todos", "readwrite");
            const store = transaction.objectStore("todos");

            const request = store.put(value);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async function remove(id: number): Promise<void> {
        const db = await openDb();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("todos", "readwrite");
            const store = transaction.objectStore("todos");

            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async function getAll(): Promise<T[]> {
        const db = await openDb();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("todos", "readonly");
            const store = transaction.objectStore("todos");

            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    return { add, get, update, remove, getAll };
}