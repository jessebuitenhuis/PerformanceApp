import {ResourceActionBase, ResourceCRUD, ResourceModel, ResourceParams} from "ng2-resource-rest";
import {Request} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";

export interface BaseResourceModel<T> {
    _id: any;
    $removeFromList(list: BaseResourceModel<T>[]) : this;
}

export class BaseResourceModel<T> extends ResourceModel<T & BaseResource<T, T, T>> {
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
    // headers: {
    //     'Accept': 'application/json'
    // }
})
export class BaseResource<TQuery, TShort, TFull> extends ResourceCRUD<TQuery, TShort, TFull> {
}
