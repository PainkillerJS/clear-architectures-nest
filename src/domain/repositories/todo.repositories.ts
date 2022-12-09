import type { TodoModel } from "../models/todo.model";

export interface TodoRepositoryType {
  insert(todo: TodoModel): Promise<TodoModel>;
  findAll(): Promise<TodoModel[]>;
  findById(id: number): Promise<TodoModel>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
