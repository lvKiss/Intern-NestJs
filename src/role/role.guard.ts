import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import RequestWithUser from "./requestWithUser.interface";
import Role from "./role.enum";

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
      canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;
        return user.role.includes(role);
      }
    }
    return mixin(RoleGuardMixin);
  }
  export default RoleGuard;