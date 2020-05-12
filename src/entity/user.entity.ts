import { hash } from 'bcrypt';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { Scope } from './scope.entity';

@Entity()
@Unique(['email'])
export class User {
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    email: string;

    @Column()
    @Generated('uuid')
    emailToken: string;

    @Column({ default: false })
    emailIsValid: boolean;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    password: string;

    @ManyToMany(type => Scope, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    scope: Scope[];

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: null })
    passwordToken: string;

    constructor(email: string, password: string, scope: Scope[]) {
        this.email = email;
        this.password = password;
        this.scope = scope;
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}
