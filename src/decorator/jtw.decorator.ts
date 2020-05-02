import { SetMetadata } from '@nestjs/common';

export const JWT = (isActive: boolean) => SetMetadata('jwt', isActive);
