import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Scope } from '../entity/scope.entity';
import { User } from '../entity/user.entity';
import { ScopeEnum } from '../model/scope.enum';
import { UserCreateDto } from '../model/user-create.dto';
import { defaultScope } from '../util/default-scope';
import { ScopeService } from './scope.service';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly usersRepository: Repository<User>,
        /*private readonly mailService: MailerService,*/
        private readonly scopeService: ScopeService,
    ) {
    }

    async create(user: UserCreateDto): Promise<boolean> {
        const scopes: Scope[] = [];
        for (const value of defaultScope) {
            await this.scopeService.upsert(value).then(scope => {
                scopes.push(scope);
            });
        }
        const userObject: User = new User(user.email, user.passwordHash, scopes);
        return await this.usersRepository
            .save(userObject)
            .then((value): boolean => {
                /*this.mailService.sendMail({
                    to: value.email,
                    from: 'no-reply@e-edu.com',
                    subject: 'Testing Nest Mailermodule with template ✔',
                    template: 'register',
                    context: {
                        url: 'https://e-edu.the-morpheus.de/',
                        token: value.token
                    },
                });*/
                return true;
            })
            .catch(() => {
                throw new BadRequestException();
            });
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: [{ email }] });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async addScope(
        userId: string,
        updatedScops: ScopeEnum[],
    ): Promise<boolean> {
        const scopes: Scope[] = [];
        for (const value of updatedScops) {
            await this.scopeService.upsert(value).then(scope => {
                scopes.push(scope);
            });
        }
        return await this.usersRepository
            .update(userId, { scope: scopes })
            .then(() => true)
            .catch(() => {
                throw new BadRequestException();
            });
    }
}
