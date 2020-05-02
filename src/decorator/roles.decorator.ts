import { SetMetadata } from '@nestjs/common';
import { ScopeEnum } from '../model/scope.enum';

export const Roles = (...roles: ScopeEnum[]) => SetMetadata('roles', roles);
