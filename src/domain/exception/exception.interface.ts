export interface FormatExceptionMessageType {
  message: string;
  code_error?: number;
}

export interface ExceptionType {
  badRequestException(data: FormatExceptionMessageType): void;
  internalServerErrorException(data?: FormatExceptionMessageType): void;
  forbiddenException(data?: FormatExceptionMessageType): void;
  UnauthorizedException(data?: FormatExceptionMessageType): void;
}
