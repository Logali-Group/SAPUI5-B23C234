sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],function (Controller, JSONModel) {

    "use strict";

    return Controller.extend("employees.controller.Main",{

        onInit: function () {
            let oEmployees = new JSONModel(),
                oCountries = new JSONModel(),
                oConfig =   new JSONModel(),
                oLayout =   new JSONModel(),
                oView =     this.getView();

            //Variable autodeclarada - Global
            this.that = this;

            //load Employees.json
            oEmployees.loadData("../model/Employees.json");
            oView.setModel(oEmployees, "jsonEmployees");

            //load Countries.json
            oCountries.loadData("../model/Countries.json");
            oView.setModel(oCountries, "jsonCountries");

            //load Config.json
            oConfig.loadData("../model/Config.json");
            oView.setModel(oConfig, "jsonConfig");

            //load Layout.json
            oLayout.loadData("../model/Layout.json");
            oView.setModel(oLayout, "jsonLayout");

            this._oEventBus = sap.ui.getCore().getEventBus();
            this._oEventBus.subscribe("flexible","showDetails", this.showEmployeeDetails.bind(this));
            this._oEventBus.subscribe("incidence", "onSaveIncidence", this.onSaveODataIncidence.bind(this));
            this._oEventBus.subscribe("incidence","onDeleteIncidence", function (sChannel, sEvent, data) {

                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
                    sUrl = "/IncidentsSet(IncidenceId='"+data.IncidenceId+"',SapId='"+data.SapId+"',EmployeeId='"+data.EmployeeId+"')";

                this.getOwnerComponent().getModel("ysapui5").remove(sUrl, {
                    success: function () {
                        this.onReadODataIncidence.bind(this)(data.EmployeeId);
                        sap.m.MessageToast.show(oResourceBundle.getText("odataDeleteOK"));
                    }.bind(this),
                    error: function () {
                        sap.m.MessageToast.show(oResourceBundle.getText("odataDeleteKO"));
                    }
                });
            }, this);
        },

        onSaveODataIncidence: function (sChannel, sEvent, data) {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
                sEmployeeID = this._detailsEmployeeView.getBindingContext("odataNorthwind").getProperty("EmployeeID");

                if (typeof data.IncidenceId == 'undefined') {

                    let aux = {
                        SapId: this.getOwnerComponent().SapId,
                        EmployeeId: sEmployeeID.toString(),
                        CreationDate: data.CreationDate,
                        Reason: data.Reason,
                        Type: data.Type
                    };

                    console.log(aux);

                    //Create

                    this.getOwnerComponent().getModel("ysapui5").create("/IncidentsSet",aux, {
                        success: function (data) {
                            //Read - Refrescar
                            this.onReadODataIncidence.bind(this)(sEmployeeID.toString());
                            sap.m.MessageToast.show(oResourceBundle.getText("odataSaveOK"));
                        }.bind(this),
                        error: function (err) {
                            sap.m.MessageToast.show(oResourceBundle.getText("odataSaveKO"));
                        } 
                    });
                } else if (data.CreationDateX || data.ReasonX || data.TypeX) {
                    //UPDATE
                    let aux = {
                        CreationDate: data.CreationDate,
                        CreationDateX: data.CreationDateX,
                        Type: data.Type,
                        TypeX: data.TypeX,
                        Reason: data.Reason,
                        ReasonX: data.ReasonX
                    };
                    console.log(aux);
                    let sUrl = "/IncidentsSet(IncidenceId='"+data.IncidenceId+"',SapId='"+data.SapId+"',EmployeeId='"+data.EmployeeId+"')";
                    console.log(sUrl);

                    this.getOwnerComponent().getModel("ysapui5").update(sUrl, aux, {
                        success: function () {
                            this.onReadODataIncidence.bind(this)(sEmployeeID.toString());
                            sap.m.MessageToast.show(oResourceBundle.getText("odataUpdateOK"));
                        }.bind(this),
                        error: function () {
                            sap.m.MessageToast.show(oResourceBundle.getText("odataUpdateKO"));
                        }
                    });
                }
        },

        onReadODataIncidence: function (sEmployeeId) {
            let sUrl ="/IncidentsSet";

            this.getOwnerComponent().getModel("ysapui5").read(sUrl,{
                filters: [
                    new sap.ui.model.Filter("SapId","EQ", this.getOwnerComponent().SapId),
                    new sap.ui.model.Filter("EmployeeId", "EQ", sEmployeeId.toString())
                ],
                success: function (data) {
                    console.log(data);
                    let oIncidenceModel = this.that._detailsEmployeeView.getModel("incidenceModel");
                        oIncidenceModel.setData(data.results);
                    let oTableIncidence = this.that._detailsEmployeeView.byId("tableIncidence");
                        oTableIncidence.removeAllContent();

                    for (let incidence in data.results) {                                       //this._detailsEmployeeView.getController();
                        let oNewIncidence = sap.ui.xmlfragment("employees.fragment.NewIncidence", this.that._detailsEmployeeView.getController()); 
                        this.that._detailsEmployeeView.addDependent(oNewIncidence);
                        oNewIncidence.bindElement("incidenceModel>/"+incidence);
                        oTableIncidence.addContent(oNewIncidence);
                    }
                }.bind(this),
                error: function (err) {
                    console.log(err);
                }
            });
        },

        onBeforeRendering: function() {
            this._detailsEmployeeView = this.getView().byId("detailsEmployeeView");
        },

        showEmployeeDetails: function (sChanne, sEventName, sPath) {
            let oDetailsView = this.getView().byId("detailsEmployeeView");
                oDetailsView.bindElement("odataNorthwind>"+sPath);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey","TwoColumnsMidExpanded");

            let oIncidence = new JSONModel([]);
            oDetailsView.setModel(oIncidence, "incidenceModel");
            oDetailsView.byId("tableIncidence").removeAllContent();

            let oBindingContext = this._detailsEmployeeView.getBindingContext("odataNorthwind"),
                sEmployeeID = oBindingContext.getProperty("EmployeeID");
            console.log(sEmployeeID);
            this.onReadODataIncidence(sEmployeeID);
        }

    });
});