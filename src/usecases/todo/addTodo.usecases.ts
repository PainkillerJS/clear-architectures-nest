import { LoggerType } from "../../domain/logger/logger.interface";
import { TodoRepositoryType } from "../../domain/repositories/todo.repositories";
import { TodoModel } from "../../domain/models/todo.model";

export class addTodoUseCases {
  constructor(
    private readonly logger: LoggerType,
    private readonly todoRepository: TodoRepositoryType
  ) {}

  async execute(content: string): Promise<TodoModel> {
    const todo = new TodoModel();
    todo.content = content;
    todo.isDone = false;
    const result = await this.todoRepository.insert(todo);
    this.logger.log("addTodoUseCases execute", "New todo have been inserted");

    return result;
  }
}
