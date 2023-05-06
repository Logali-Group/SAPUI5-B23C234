sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],

/**
 * @param {typeof sap.ui.core.mvc.Controller}                   Controller
 * @param {typeof sap.m.MessageToast}                           MessageToast
 * @param {typeof sap.ui.model.json.JSONModel}                  JSONModel
 */

function (Controller, MessageToast, MessageBox, JSONModel, Model, ResourceModel) {

    return Controller.extend("invoices.controller.App",{

        onInit: function () {

        },

        onShowHello: function () {
            let oBundle = this.getView().getModel("i18n").getResourceBundle(),
                sMessage = this.getView().getModel().getProperty("/recipient/name");
            
            MessageToast.show(oBundle.getText("helloMsg",[sMessage]));
            //MessageBox.alert(sMessage);
        }

    });

});