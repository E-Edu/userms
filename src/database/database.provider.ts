import { createConnection } from 'typeorm';
import { Scope } from '../entity/scope.entity';
import { User } from '../entity/user.entity';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            return await createConnection({
                type: 'postgres',
                host: process.env.USERMS_DATABASE_HOST,
                port: +process.env.USERMS_DATABASE_PORT,
                username: process.env.USERMS_DATABASE_USER,
                password: process.env.USERMS_DATABASE_PASSWORD,
                entities: [User, Scope],
                synchronize: true,
            });
        },
    },
];
