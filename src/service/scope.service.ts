import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Scope } from "../entity/scope.entity";
import { ScopeEnum } from "../model/scope.enum";

@Injectable()
export class ScopeService {
    constructor(
        @Inject('SCOPE_REPOSITORY')
        private scopeRepository: Repository<Scope>,
    ) {}

    async create(scope: ScopeEnum): Promise<boolean> {
        return await this.scopeRepository
            .save(new Scope(scope))
            .then(() => true)
            .catch(() => {
                throw new BadRequestException('User already exist');
            });
    }

    async remove(scope: ScopeEnum): Promise<void> {
        await this.scopeRepository.delete(scope);
    }

    async findOne(scope: ScopeEnum): Promise<Scope> {
        return this.scopeRepository.findOne(scope);
    }

    async upsert(scope: ScopeEnum): Promise<Scope> {
        return this.scopeRepository
            .findOne(scope)
            .then(value =>
                !!value ? value : this.scopeRepository.save(new Scope(scope)),
            );
    }
}
