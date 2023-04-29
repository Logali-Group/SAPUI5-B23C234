sap.ui.define([
    "sap/ui/core/UIComponent",
    "invoices/model/Model",
    "sap/ui/model/resource/ResourceModel"
],function (UIComponent, Model, ResourceModel) {

    "use strict";

    return UIComponent.extend("invoices.Component",{

        metadata: {
            manifest: "json"
        },

        init: function () {

            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(Model.createRecipient());

            let oI18n = new ResourceModel({
                bundleName: "invoices.i18n.i18n"
            });

            this.setModel(oI18n, "i18n");

        }

    });

});