import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {


  constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {

        const getRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getClass(),
            context.getHandler(),
        ]);

        if(!getRoles){
            return true;
        }

        const req = context.switchToHttp().getRequest();

        const user = req.user;

        if(!user){
            throw new ForbiddenException('User not found');
        }

        const hasRole = getRoles.includes(user.role);


        if(!hasRole){
            throw new ForbiddenException('User does not have the required role');
        }


        return true;
    }

}