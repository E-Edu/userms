import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
    disableErrorMessages?: boolean;
    exceptionFactory?: (errors: ValidationError[]) => any;
    transform?: boolean;
}
