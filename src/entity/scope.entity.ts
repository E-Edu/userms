import { Entity, PrimaryColumn, Unique } from 'typeorm';
import { ScopeEnum } from '../model/scope.enum';

@Entity()
@Unique(['key'])
export class Scope {
    @PrimaryColumn()
    key: ScopeEnum;

    constructor(key: ScopeEnum) {
        this.key = key;
    }
}
