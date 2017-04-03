
import {Injectable, NgModule} from "@angular/core";
import {Http, Response, Request, RequestOptions, RequestOptionsArgs, XHRBackend} from "@angular/http";
import {Observable} from "rxjs/Observable";
export const tokenName = 'performance_app_token';


@Injectable()
export class AuthHttp extends Http {
    static saveToken(res: Response) : Response {
        if (res.headers) {
            let newToken = res.headers.get('X-AUTH-TOKEN');
            if (newToken) {
                localStorage.setItem(tokenName, newToken);
            }
        }

        return res;
    }

    static removeToken(err: any) : any {
        if (err.status === 401) {
            localStorage.removeItem(tokenName);
        }

        return err;
    }

    request(url: string | Request, options?: RequestOptionsArgs) : Observable<Response> {
        if (typeof url === 'string') {
            return this.get(url, options);
        }

        let token = localStorage.getItem(tokenName);

        if (token) {
            if (url instanceof Request) {
                url.headers.set('Authorization', token);
            }
        }

        return super.request(url, options)
            .map(AuthHttp.saveToken)
            .catch(AuthHttp.removeToken);
    }
}

export function AuthHttpFactory(backend: XHRBackend, requestOptions: RequestOptions) {
    return new AuthHttp(backend, requestOptions);
}

@NgModule({
    providers: [
        {
            provide: Http,
            useFactory: AuthHttpFactory,
            deps: [XHRBackend, RequestOptions]
        }
    ]
})
export class AuthModule { }