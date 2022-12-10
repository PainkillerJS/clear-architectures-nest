import { DynamicModule, Module } from "@nestjs/common";
import { AddTodoUseCases } from "../../usecases/todo/addTodo.usecases";
import { DeleteTodoUseCases } from "../../usecases/todo/deleteTodo.usecases";
import { GetTodoUseCases } from "../../usecases/todo/getTodo.usecases";
import { GetTodosUseCases } from "../../usecases/todo/getTodos.usecases";
import { UpdateTodoUseCases } from "../../usecases/todo/updateTodo.usecases";
import { ExceptionsModule } from "../exceptions/exceptions.module";
import { LoggerModule } from "../logger/logger.module";
import { LoggerService } from "../logger/logger.service";
import { RepositoriesModule } from "../repositories/repositories.module";
import { DatabaseTodoRepository } from "../repositories/todo.repository";
import { UseCaseProxy } from "./usecases-proxy";

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_TODO_USECASES_PROXY = "getTodoUsecasesProxy";
  static GET_TODOS_USECASES_PROXY = "getTodosUsecasesProxy";
  static POST_TODO_USECASES_PROXY = "postTodoUsecasesProxy";
  static DELETE_TODO_USECASES_PROXY = "deleteTodoUsecasesProxy";
  static PUT_TODO_USECASES_PROXY = "putTodoUsecasesProxy";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseTodoRepository],
          provide: this.GET_TODO_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: this.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new GetTodosUseCases(todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: this.POST_TODO_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            todoRepository: DatabaseTodoRepository
          ) => new UseCaseProxy(new AddTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: this.PUT_TODO_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            todoRepository: DatabaseTodoRepository
          ) => new UseCaseProxy(new UpdateTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: this.DELETE_TODO_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            todoRepository: DatabaseTodoRepository
          ) => new UseCaseProxy(new DeleteTodoUseCases(logger, todoRepository)),
        },
      ],
      exports: [
        this.GET_TODO_USECASES_PROXY,
        this.GET_TODOS_USECASES_PROXY,
        this.POST_TODO_USECASES_PROXY,
        this.PUT_TODO_USECASES_PROXY,
        this.DELETE_TODO_USECASES_PROXY,
      ],
    };
  }
}
