import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export interface Response<T> {
    data: T;
}

@Injectable()
export class ServiceTokenAddInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        context
            .switchToHttp()
            .getResponse()
            .setHeader('X-ServiceToken', process.env.USERMS_SERVICE_TOKEN);
        return next.handle();
    }
}
