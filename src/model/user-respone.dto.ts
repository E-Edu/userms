import { ApiProperty } from '@nestjs/swagger';
import { Scope } from '../entity/scope.entity';
import { defaultScope } from '../util/default-scope';
import { ScopeEnum } from './scope.enum';

export class UserResponeDto {
    createdAt: Date;

    email: string;

    emailIsValid: boolean;

    id: string;

    isActive: boolean;

    @ApiProperty({ enum: ScopeEnum, default: defaultScope, isArray: true })
    scope: Scope[];

    updatedAt: Date;
}
