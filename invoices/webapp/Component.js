sap.ui.define([
    "sap/ui/core/UIComponent",
    "invoices/model/Model",
    "invoices/controller/HelloDialog"
],function (UIComponent, Model, HelloDialog) {

    "use strict";

    return UIComponent.extend("invoices.Component",{

        metadata: {
            manifest: "json"
        },

        init: function () {

            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(Model.createRecipient());

            // open dialog
            this._helloDialog = new HelloDialog(this.getRootControl());
        },

        exit: function () {
            this._helloDialog.destroy();
            delete this._helloDialog();
        },

        onOpenHelloDialog: function () {
            this._helloDialog.open();
        }

    });

});