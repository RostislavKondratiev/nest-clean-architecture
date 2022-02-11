import { ExceptionsCodes } from "./exceptions-codes";

export class BaseException extends Error {
    statusCode: number;

    constructor(message: string, klass?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestException extends BaseException {
    constructor(message: string, statusCode: number = ExceptionsCodes.BAD_REQUEST) {
        super(message, BadRequestException.name, statusCode);
    }
}

export class UnauthorizedException extends BaseException {
    constructor(message: string, statusCode: number = ExceptionsCodes.UNAUTHORIZED) {
        super(message, UnauthorizedException.name, statusCode);
    }
}

export class ForbiddenException extends BaseException {
    constructor(message: string, statusCode: number = ExceptionsCodes.FORBIDDEN) {
        super(message, ForbiddenException.name, statusCode);
    }
}

export class NotFoundException extends BaseException {
    constructor(message: string, statusCode: number = ExceptionsCodes.NOT_FOUND) {
        super(message, NotFoundException.name, statusCode);
    }
}