sap.ui.define([
	"sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function(
	ManagedObject,
    Fragment
) {
	"use strict";

	return ManagedObject.extend("invoices.controller.HelloDialog", {

        constructor: function (oView) {
            this._oView = oView;
        },

        exit: function () {
            delete this._oView;
        },

        open: function () {
            let oView = this._oView;

            let oFragmentController = {
                onCloseDialog: function () {
                    //this.getView().byId("helloDialog").close();
                    oView.byId("helloDialog").close();
                }
            };

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "invoices.fragment.HelloDialog",
                    controller: oFragmentController
                })
            }

            this._pDialog.then(function (oDialog) {
                oView.addDependent(oDialog);
                oDialog.open();
            });
        }

	});
});