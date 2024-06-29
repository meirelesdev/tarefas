export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  due_date: string;
}

export type Status = "completed" | "pending";