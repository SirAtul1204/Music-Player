import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { IJwt } from 'src/utils/interfaces';
// import { JwtPayload } from 'src/utils/interfaces';

function validateRequest(request: any): boolean {
  const token = request.cookies['token'];
  const data = jwt.verify(token, process.env.SECRET) as IJwt;
  if (data) {
    request.user = { userId: data.userId };
    return true;
  } else return false;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
