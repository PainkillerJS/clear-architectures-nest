import { TodoModel } from "../../domain/models/todo.model";
import type { TodoRepositoryType } from "../../domain/repositories/todo.repositories";

export class getTodosUseCases {
  constructor(private readonly todoRepository: TodoRepositoryType) {}

  async execute(): Promise<TodoModel[]> {
    return await this.todoRepository.findAll();
  }
}
