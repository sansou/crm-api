import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();


    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param message
    */
    const responseMessage = (type: string, message: string) => {
      const body = {
        statusCode: status,
        path: request.url,
        errorType: type,
        errorMessage: message,
      }
      console.error('exception:',body);
      response.status(status).json(body);
    };

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    responseMessage(exception.name, exception.message);
  }
}
