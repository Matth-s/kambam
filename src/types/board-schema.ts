export interface BoardEntity {
  id: string;
  name: string;
  columns: ColumnsEntity[] | [];
}
export interface ColumnsEntity {
  id: string;
  name: string;
  tasks: TasksEntity[] | [];
}
export interface TasksEntity {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubtasksEntity[] | [];
}
export interface SubtasksEntity {
  id: string;
  title: string;
  isCompleted: boolean;
}
