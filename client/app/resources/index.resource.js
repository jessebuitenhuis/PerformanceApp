System.register(["ng2-resource-rest"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ng2_resource_rest_1, BaseResourceModel, BaseResource;
    return {
        setters: [
            function (ng2_resource_rest_1_1) {
                ng2_resource_rest_1 = ng2_resource_rest_1_1;
            }
        ],
        execute: function () {
            BaseResourceModel = class BaseResourceModel extends ng2_resource_rest_1.ResourceModel {
                constructor() {
                    super();
                }
                $removeFromList(list) {
                    super.$remove().$observable.subscribe(() => {
                        var index = list.indexOf(this);
                        list.splice(index, 1);
                    });
                    return this;
                }
                isNew() {
                    return !this._id;
                }
            };
            exports_1("BaseResourceModel", BaseResourceModel);
            BaseResource = class BaseResource extends ng2_resource_rest_1.ResourceCRUD {
                initResultObject() {
                    return new BaseResourceModel();
                }
            };
            exports_1("BaseResource", BaseResource);
        }
    };
});
