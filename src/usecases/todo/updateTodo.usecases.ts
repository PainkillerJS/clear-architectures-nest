import type { LoggerType } from "../../domain/logger/logger.interface";
import type { TodoRepositoryType } from "../../domain/repositories/todo.repositories";

export class updateTodoUseCases {
  constructor(
    private readonly logger: LoggerType,
    private readonly todoRepository: TodoRepositoryType
  ) {}

  async execute(id: number, isDone: boolean): Promise<void> {
    await this.todoRepository.updateContent(id, isDone);
    this.logger.log(
      "updateTodoUseCases execute",
      `Todo ${id} have been updated`
    );
  }
}
