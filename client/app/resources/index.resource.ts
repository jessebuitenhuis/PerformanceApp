import {ResourceModel, ResourceCRUD, Resource, ResourceMethod} from "ng2-resource-rest";

export interface BaseResourceModel<T> {
    _id?: any;
    $removeFromList(list: BaseResourceModel<T>[]) : this;
}

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

export class BaseResource<T> extends ResourceCRUD<any, T, T> {
    initResultObject() : BaseResourceModel<T> {
        return new BaseResourceModel<T>();
    }
}



