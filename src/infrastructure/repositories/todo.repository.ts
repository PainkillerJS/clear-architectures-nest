import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "../entities/todo.entity";
import type { TodoRepositoryType } from "../../domain/repositories/todo.repositories";
import { TodoModel } from "../../domain/models/todo.model";

@Injectable()
export class DatabaseTodoRepository implements TodoRepositoryType {
  constructor(
    @InjectRepository(Todo)
    private readonly todoEntityRepository: Repository<Todo>
  ) {}

  async updateContent(id: number, isDone: boolean): Promise<void> {
    await this.todoEntityRepository.update(
      {
        id,
      },
      { isDone }
    );
  }
  async insert(todo: TodoModel): Promise<TodoModel> {
    const todoEntity = this.toTodoEntity(todo);
    const newTodo = await this.todoEntityRepository.insert(todoEntity);

    return this.toTodo(newTodo.generatedMaps[0] as Todo);
  }
  async findAll(): Promise<TodoModel[]> {
    const todosEntity = await this.todoEntityRepository.find();

    return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
  }
  async findById(id: number): Promise<TodoModel> {
    const todoEntity = await this.todoEntityRepository.findOneOrFail({
      where: { id },
    });

    return this.toTodo(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.todoEntityRepository.delete({ id: id });
  }

  private toTodo(todoEntity: Todo): TodoModel {
    const todo: TodoModel = new TodoModel();

    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    todo.createDate = todoEntity.createDate;
    todo.updatedDate = todoEntity.updatedDate;

    return todo;
  }

  private toTodoEntity(todo: TodoModel): Todo {
    const todoEntity: Todo = new Todo();

    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todoEntity.isDone = todo.isDone;

    return todoEntity;
  }
}
