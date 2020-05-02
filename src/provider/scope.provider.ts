import { Connection } from 'typeorm';
import { Scope } from '../entity/scope.entity';

export const scopeProvider = [
    {
        provide: 'SCOPE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Scope),
        inject: ['DATABASE_CONNECTION'],
    },
];
