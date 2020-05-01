import { createConnection } from 'typeorm';
import { User } from '../entity/user.enetity';

const host: string = process.env.DATABASE_HOST;
const port: number = +process.env.DATABASE_PORT;
const username: string = process.env.DATABASE_USER;
const password: string = process.env.DATABASE_PASSWORD;

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            return await createConnection({
                type: 'postgres',
                host,
                port,
                username,
                password,
                entities: [
                    User,
                ],
                synchronize: true,
            });
        },
    },
];
