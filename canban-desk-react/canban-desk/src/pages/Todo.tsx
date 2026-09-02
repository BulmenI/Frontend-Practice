import type { Task } from "../types/types";
import { useEffect, useState } from "react";
import {useIndexedDb} from "../hooks/customHooks";
 
 function Todo() {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const { getAll } = useIndexedDb<Task>();

    useEffect(() => {
        const fetchTasks = async () =>{
            const tasks = await getAll();
            setTaskList(tasks.result);
        }
        fetchTasks();
    },[]);

    return (
        <>
        
        </>
    );

}



export default Todo;