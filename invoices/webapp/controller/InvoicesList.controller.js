sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "invoices/model/InvoicesFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],function (Controller, JSONModel, InvoicesFormatter, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("invoices.controller.InvoicesList", {

        formatter: InvoicesFormatter,

        onInit: function () {
            let oViewModel = new JSONModel({
                usd: "USD",
                eur: "EUR"
            });
            this.getView().setModel(oViewModel, "currency");
        },

        onFilter: function (oEvent) {
            //console.log(oEvent);
            //let oParameter = oEvent.getParameters(),
                //sValue = oParameter.newValue;
            let sValue = oEvent.getParameter("newValue"),
                aFilter = [];

                if (sValue) {
                    aFilter.push(new Filter({
                        filters:[
                            new Filter("ProductName",FilterOperator.Contains, sValue,),
                            new Filter("ShipperName", FilterOperator.Contains, sValue)
                        ],
                        and: false
                    }));
                    console.log(aFilter);
                }

                let oList = this.getView().byId("invoiceList"),
                    oBinding = oList.getBinding("items");
                    oBinding.filter(aFilter);
        },

        onNavToDetails: function (oEvent) {

            let oItem = oEvent.getSource(),
                oBindingContext = oItem.getBindingContext("northwind"),
                sPath = oBindingContext.getPath();

            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oRouter.navTo("Details",{
                    invoicePath: window.encodeURIComponent(sPath)
                });
        }

    });
});