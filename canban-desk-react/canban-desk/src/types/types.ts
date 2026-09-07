export type Status = "todo" | "in-progress" | "done";
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
  priority?: string;
  status?: Status;
  position?: number;
};
