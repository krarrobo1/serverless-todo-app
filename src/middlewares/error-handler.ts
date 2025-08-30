import { Request, Response, NextFunction } from 'express';
import { ValidateError } from 'tsoa';


interface ErrorWithStatus extends Error {
    status?: number;
    fields?: string[];
  }

export const errorHandler = (err: ErrorWithStatus | ValidateError, req: Request, res: Response, next: NextFunction): Response | void  => {
    if (err.status === 400) {
        return res.status(400).json({
            message: 'Bad Request',
            details: err.fields
        });
    }
    return res.status(500).json({
        message: 'Internal Server Error'
    });
}