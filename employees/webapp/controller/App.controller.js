sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("employees.controller.App", {
            onInit: function () {

                let oModel = new JSONModel(),
                    oView =this.getView(),
                    oResourceBundle = oView.getModel("i18n").getResourceBundle();

                // let oData = {
                //     employeeId: "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key:"US",
                //             text: oResourceBundle.getText("countryUS")
                //         },
                //         {
                //             key:"UK",
                //             text:oResourceBundle.getText("countryUK")
                //         },                        {
                //             key:"ES",
                //             text:oResourceBundle.getText("countryES")
                //         }
                //     ]
                // };

                // oView.setModel(new JSONModel(oData));

                oModel.loadData("../model/Employees.json");
                console.log(oModel);
                oView.setModel(oModel);
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
            },

            onFilter: function () {
                let oModel = this.getView().getModel(),
                    aFilters = [];

                if (oModel.getProperty("/EmployeeId") !== "") {
                    aFilters.push(new Filter("EmployeeID", FilterOperator.Contains, oModel.getProperty("/EmployeeId")));
                }

                if (oModel.getProperty("/CountryKey") !== "") {
                    aFilters.push(new Filter("Country", FilterOperator.EQ, oModel.getProperty("/CountryKey")));
                }

                let oTable = this.byId("tableEmployee"),
                    oBinding = oTable.getBinding("items");
                    oBinding.filter(aFilters);
            },

            onClear: function () {
                let oModel = this.getView().getModel();
                    oModel.setProperty("/EmployeeId", "");
                    oModel.setProperty("/CountryKey", "");

                let oTable = this.byId("tableEmployee"),
                    oBinding = oTable.getBinding("items");
                    oBinding.filter([]);   
            },

            showPostalCode: function (oEvent) {
                let oItem = oEvent.getSource(),
                    oBindingContext = oItem.getBindingContext(),
                    sPostal = oBindingContext.getProperty("PostalCode");
                console.log(oItem);
                console.log(oBindingContext);
                //sap.m.MessageToast.show(sPostal);
                sap.m.MessageBox.success(sPostal);
            }
        });
    });
