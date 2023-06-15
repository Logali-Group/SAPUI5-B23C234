sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("employees.controller.App", {
            onInit: function () {

            },

            onValidate: function () {
                let oInput = this.byId("inputEmployee"),
                    sValue = oInput.getValue();

                if (sValue.length === 6) {
                    //oInput.setDescription("OK");
                    this.byId("label").setVisible(true);
                    this.byId("select").setVisible(true);
                } else {
                    //oInput.setDescription("Not OK");
                    this.byId("label").setVisible(false);
                    this.byId("select").setVisible(false);
                }
            }
        });
    });
