import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ExceptionType,
  FormatExceptionMessageType,
} from "../../domain/exception/exception.interface";

@Injectable()
export class ExceptionsService implements ExceptionType {
  badRequestException(data: FormatExceptionMessageType) {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: FormatExceptionMessageType) {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: FormatExceptionMessageType) {
    throw new ForbiddenException(data);
  }
  UnauthorizedException(data?: FormatExceptionMessageType) {
    throw new UnauthorizedException(data);
  }
}
