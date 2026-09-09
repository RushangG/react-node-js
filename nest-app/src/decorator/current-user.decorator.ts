import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log('CurrentUser decorator called. User:', user);

    if (data && user) {
      return user[data];
    }
    return user;
  },
);
