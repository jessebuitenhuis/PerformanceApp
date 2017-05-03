import {Injectable, NgModule} from "@angular/core"
import {Http, Response, Request, RequestOptions, RequestOptionsArgs, XHRBackend} from "@angular/http"
import {Observable} from "rxjs/Observable"
export const tokenName = 'performance_app_token'


@Injectable()
export class AuthHttp extends Http {
    static saveToken(res: Response): Response {
        if (res.headers) {
            let newToken = res.headers.get('X-AUTH-TOKEN')
            if (newToken) {
                localStorage.setItem(tokenName, newToken)
            }
        }

        return res
    }

    static removeToken(): any {
        localStorage.removeItem(tokenName)
    }

    static handleHttpError(err: any): any {
        switch (err.status) {
            case 401:
                AuthHttp.removeToken()
                break
            case 404:
                err._body = err.statusText
                break
            default:
                break
        }

        return Observable.throw(err)
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

        if (typeof url === 'string') {
            return this.get(url, options)
        }

        let token = localStorage.getItem(tokenName)

        if (token) {
            if (url instanceof Request) {
                url.headers.set('Authorization', token)
            }
        }

        return super.request(url, options)
            .map(AuthHttp.saveToken)
            .catch(AuthHttp.handleHttpError)
    }
}

export function AuthHttpFactory(backend: XHRBackend, requestOptions: RequestOptions) {
    return new AuthHttp(backend, requestOptions)
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
export class AuthModule {
}