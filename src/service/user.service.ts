import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.enetity';
import { UserDto } from '../model/user.dto';

@Injectable()
export class UserService {
  constructor(
      @Inject('USER_REPOSITORY')
      private usersRepository: Repository<User>,
  ) {
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: [{ email }]);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: UserDto): Promise<User> {
    return await this.usersRepository.save(new User(user.email, user.password));
  }
}
