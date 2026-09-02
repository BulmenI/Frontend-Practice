import  type {Task} from "../types/types";

type TaskCardProps = {
    task:Task;
    onDragStart?: (taskID: number) => void;
}

function TaskCard({task, onDragStart}:TaskCardProps) {

    return(
        <div
            className="task-card"
            draggable={true}
            onDragStart={()=> onDragStart?.(task.id)}
            key={task.id}
        > 
            <h3>{task.name}</h3>
            <p>Start: {task.startTime}</p>
            <p>End: {task.endTime}</p>
            {task.priority && <p>Priority: {task.priority}</p>}
            {task.status && <p>Status: {task.status}</p>}
        </div>
    );
}

export default TaskCard;