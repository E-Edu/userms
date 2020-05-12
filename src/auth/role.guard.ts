import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Scope } from "../entity/scope.entity";
import { ScopeEnum } from "../model/scope.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<ScopeEnum[]>(
            'roles',
            context.getHandler(),
        );
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        return this.matchRoles(roles, request.user.scope);
    }

    private matchRoles(roles: ScopeEnum[], userScopes: Scope[]) {
        return !!userScopes.filter(value => -1 !== roles.indexOf(value.key))
            .length;
    }
}
