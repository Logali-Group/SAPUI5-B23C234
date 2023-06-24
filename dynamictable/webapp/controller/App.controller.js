sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "dynamictable/utils/Utils"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Utils) {
        "use strict";

        return Controller.extend("dynamictable.controller.App", {

            onInit: function () {

            },

            onCreateTable (sEntity) {
                Utils.createTable(sEntity, this);
            }
        });
    });
