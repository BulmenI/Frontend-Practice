export type Status = "todo" | "in-progress" | "done";

export type Task = {
    id:number;
    name:string;
    startTime:string;
    endTime:string;
    priority?:string;
    status?:Status;
    position?:number;
}
