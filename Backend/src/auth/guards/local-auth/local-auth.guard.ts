import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: Error, user: any) {
    // puedes personalizar aquí el manejo de errores
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
