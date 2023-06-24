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

                let oEmployees = new JSONModel(),
                    oCountries = new JSONModel(),
                    oConfig = new JSONModel(),
                    oView =this.getView();

                //load Employees.json
                oEmployees.loadData("../model/Employees.json");
                oView.setModel(oEmployees, "jsonEmployees");

                //load Countries.json
                oCountries.loadData("../model/Countries.json");
                oView.setModel(oCountries, "jsonCountries");

                //load Config.json
                oConfig.loadData("../model/Config.json");
                oView.setModel(oConfig, "jsonConfig");
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
                let oModel = this.getView().getModel("jsonCountries"),
                    aFilters = [];

                    console.log(oModel);

                if (oModel.getProperty("/EmployeeId") !== "") {
                    aFilters.push(new Filter({
                        filters:[
                            new Filter("EmployeeID", FilterOperator.Contains, oModel.getProperty("/EmployeeId")),
                            new Filter("FirstName", FilterOperator.Contains, oModel.getProperty("/EmployeeId")),
                            new Filter("LastName", FilterOperator.Contains, oModel.getProperty("/EmployeeId")),
                        ],
                        and: false
                    }));
                }

                if (oModel.getProperty("/CountryKey") !== "") {
                    aFilters.push(new Filter("Country", FilterOperator.EQ, oModel.getProperty("/CountryKey")));
                }

                let oTable = this.byId("tableEmployee"),
                    oBinding = oTable.getBinding("items");
                    oBinding.filter(aFilters);
            },

            onClear: function () {
                let oModel = this.getView().getModel("jsonCountries");
                    oModel.setProperty("/EmployeeId", "");
                    oModel.setProperty("/CountryKey", "");

                let oTable = this.byId("tableEmployee"),
                    oBinding = oTable.getBinding("items");
                    oBinding.filter([]);   
            },

            showPostalCode: function (oEvent) {
                let oItem = oEvent.getSource(),
                    oBindingContext = oItem.getBindingContext("jsonEmployees"),
                    sPostal = oBindingContext.getProperty("PostalCode");
                console.log(oItem);
                console.log(oBindingContext);
                //sap.m.MessageToast.show(sPostal);
                sap.m.MessageBox.success(sPostal);
            },

            onShowCity: function () {
                var oConfig = this.getView().getModel("jsonConfig");
                    oConfig.setProperty("/visibleCity", true );
                    oConfig.setProperty("/visibleBtnShowCity", false);
                    oConfig.setProperty("/visibleBtnHideCity", true);
            },

            onHideCity: function () {
                var oConfig = this.getView().getModel("jsonConfig");
                    oConfig.setProperty("/visibleCity", false );
                    oConfig.setProperty("/visibleBtnShowCity", true);
                    oConfig.setProperty("/visibleBtnHideCity", false);
            }
        });
    });
