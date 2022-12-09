import type { LoggerType } from "../../domain/logger/logger.interface";
import type { TodoRepositoryType } from "../../domain/repositories/todo.repositories";

export class deleteTodoUseCases {
  constructor(
    private readonly logger: LoggerType,
    private readonly todoRepository: TodoRepositoryType
  ) {}

  async execute(id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
    this.logger.log(
      "deleteTodoUseCases execute",
      `Todo ${id} have been deleted`
    );
  }
}
