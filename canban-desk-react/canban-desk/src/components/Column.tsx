import type { Task, Status } from "../types/types";
import React from "react";
import TaskCard from "./TaskCard";
import '../styles/column.css';
import { useDroppable } from "@dnd-kit/core";


type ColumnProps = {
    status:Status;
    tasks:Task[];
    onDragOver:(e:React.DragEvent<HTMLDivElement>)=>void;
    onDrop:(e:React.DragEvent<HTMLDivElement>, status:Status)=>void;
    onDragStart: (taskID: number) => void;
    onDelete: (taskID: number) => void;
    onEdit: (taskID: number, name:string) => void;
}

    function Column({
        status,
        tasks,
        onDragOver,
        onDrop,
        onDragStart,
        onDelete,
        onEdit
        }:ColumnProps){

        const{setNodeRef} = useDroppable({id:String(status)});

    return(
        <div 
        className="column"
        ref={setNodeRef}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e,status)}
        >
            {tasks.filter(task => task.status === status).map((task) => (
                <TaskCard
                    key ={task.id}
                    task={task}
                    onDragStart={onDragStart}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        
        </div>
    );    

}


export default React.memo(Column);