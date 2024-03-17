export type status = "pending" | "ongoing" | "completed";

export interface Task {
    id: number;
    task: string;
    status: status;
    isDone: boolean;
}