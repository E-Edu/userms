import { Connection } from 'typeorm';
import { User } from '../entity/user.entity';

export const userProvider = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION'],
    },
];
