import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Timestamp } from '../util/timestamp';

@Injectable()
export class ServiceTokenInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        if (request.headers['x-servicetoken'] === process.env.USERMS_SERVICE_TOKEN) {
            return next
                .handle();
        }
        console.warn(`${Timestamp.now()} Unauthorized Request from ${request.headers['x-Forwarded-For']} on route ${request.url}`);
        throw new UnauthorizedException();
    }
}
