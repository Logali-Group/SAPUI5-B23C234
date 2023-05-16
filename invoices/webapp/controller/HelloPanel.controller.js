sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(
	Controller,
    MessageToast
) {
	"use strict";

	return Controller.extend("invoices.controller.HelloPanel", {

        onShowHello: function () {
            let oBundle = this.getView().getModel("i18n").getResourceBundle(),
                sMessage = this.getView().getModel().getProperty("/recipient/name");
            MessageToast.show(oBundle.getText("helloMsg",[sMessage]));
            //MessageBox.alert(sMessage);
        },

        onOpenDialog: function () {
            this.getOwnerComponent().onOpenHelloDialog();
        }
	});
});