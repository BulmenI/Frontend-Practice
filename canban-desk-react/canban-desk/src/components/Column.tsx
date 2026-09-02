import type { Task } from "../types/types";
type ColumnProps = {
    title:string;
    tasks:Task[];
    onDragOver:(e:React.DragEvent<HTMLDivElement>)=>void;
    onDrop:(e:React.DragEvent<HTMLDivElement>)=>void;
}

function Column(){

    return(
        <>
        
        </>
    );    

}


export default Column;