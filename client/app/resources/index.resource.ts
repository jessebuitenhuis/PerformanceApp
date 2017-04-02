import {ResourceActionBase, ResourceCRUD, ResourceModel, ResourceParams} from "ng2-resource-rest";
import {Request} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";

export interface BaseResourceModel<T> {
    _id: any;
    $removeFromList(list: BaseResourceModel<T>[]) : this;
}

const tokenName : string = 'performance_app_token';

export class BaseResourceModel<T> extends ResourceModel<T> {
    constructor(){
        super();
    }

    $removeFromList(list: BaseResourceModel<T>[]) : this {
        super.$remove().$observable.subscribe(() => {
            var index = list.indexOf(this);
            list.splice(index, 1);
        });

        return this;
    }

    protected isNew() : boolean {
        return !this._id;
    }
}

@ResourceParams({
    headers: {
        'Accept': 'appppplication'
    }
})
export class BaseResource<TQuery, TShort, TFull> extends ResourceCRUD<TQuery, TShort, TFull> {
    initResultObject() : BaseResourceModel<TFull> {
        return new BaseResourceModel<TFull>();
    }

    // getHeaders(methodOptions: any) {
    //     let headers = super.getHeaders();
    //
    //     var authToken = localStorage.getItem(tokenName);
    //     console.log(tokenName, authToken);
    //     if (authToken) headers.Authorization = authToken;
    //
    //     return headers;
    // }
    //
    // responseInterceptor(observable: Observable<any>, request: Request, methodOptions: ResourceActionBase): Observable<any> {
    //     return Observable.create((subscriber: Subscriber<any>) => {
    //         observable.subscribe((res: Response) => {
    //             console.log('interceptor', res);
    //             if (res.headers) {
    //                 let newToken = res.headers.get('X-AUTH-TOKEN');
    //                 console.log(newToken);
    //                 if (newToken) {
    //                     localStorage.setItem(tokenName, newToken);
    //                 }
    //                 subscriber.next((<any>res)._body ? res.json() : null);
    //             }
    //         }, (error: Response) => {
    //             if (error.status === 401) {
    //                 localStorage.removeItem(tokenName);
    //             }
    //             subscriber.error(error);
    //         }, () => subscriber.complete());
    //     });
    // }
}
