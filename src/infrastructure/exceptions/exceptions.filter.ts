import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from 'express';
import { BaseException } from "src/domain/exceptions/exceptions";
import { ExceptionsCodes } from "src/domain/exceptions/exceptions-codes";
import { Message } from "./message";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: BaseException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.log(exception);

        const message: Message = {
            statusCode: exception.statusCode
              ? exception.statusCode
              : ExceptionsCodes.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        };

        response
            .status(exception.statusCode ? exception.statusCode : ExceptionsCodes.INTERNAL_SERVER_ERROR)
            .json(message);

    }

}