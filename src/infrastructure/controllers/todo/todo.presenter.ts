import { ApiProperty } from "@nestjs/swagger";
import { TodoModel } from "../../../domain/models/todo.model";

export class TodoPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(todo: TodoModel) {
    this.id = todo.id;
    this.content = todo.content;
    this.isDone = todo.isDone;
    this.createDate = todo.createDate;
    this.updatedDate = todo.updatedDate;
  }
}
