import { TodoModel } from "../../domain/models/todo.model";
import type { TodoRepositoryType } from "../../domain/repositories/todo.repositories";

export class GetTodoUseCases {
  constructor(private readonly todoRepository: TodoRepositoryType) {}

  async execute(id: number): Promise<TodoModel> {
    return await this.todoRepository.findById(id);
  }
}
