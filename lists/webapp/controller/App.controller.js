sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("lists.controller.App", {

            onInit: function () {
                this._loadModel();
                console.log(this.byId("notification"));
            },

            _loadModel: function () {
                let oModel = new JSONModel();
                    oModel.loadData("../model/ListData.json");
                this.getView().setModel(oModel);
            }
        });
    });
