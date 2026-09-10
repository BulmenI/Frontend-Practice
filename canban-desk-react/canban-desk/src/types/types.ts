export type Status = "todo" | "inProgress" | "done";
export type Priority = "low" | "medium" | "high";
export type ProfilerAttributes = {
  id: string;
  phase: string;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: number;
};
export type Task = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  priority?: Priority;
  status?: Status;
  position?: number;
};
