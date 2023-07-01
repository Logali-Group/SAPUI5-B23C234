sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("employees.controller.MasterEmployee", {

            onInit: function () {
                this._oEventBus = sap.ui.getCore().getEventBus();
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
            },

            showOrders: function (oEvent) {

                let oTable = this.getView().byId("ordersTable");                //Control Dinamico
                    oTable.destroyItems();                                      //Eliminar todos los Items, que fueron creados dinamicamente

                let oItem = oEvent.getSource(),                                 //Obtengo el item que estoy seleccionando/presionando
                    oBindingContext = oItem.getBindingContext("jsonEmployees"), //Obtengo el Binding (items) que estan en el modelo
                    oOrders = oBindingContext.getProperty("Orders"); 
                
                //Crear los items dinamicamente
                let aColumnListItems = [];

                oOrders.forEach((oOrder)=>{
                    aColumnListItems.push(new sap.m.ColumnListItem({
                        cells:[
                            new sap.m.Text({text: oOrder.OrderID}),
                            new sap.m.Text({text: oOrder.Freight}),
                            new sap.m.Text({text: oOrder.ShipAddress}),
                        ]
                    }));
                });

                let oNewTable = new sap.m.Table({
                    width: "auto",
                    columns:[
                        new sap.m.Column({header: new sap.m.Label({text: "{i18n>orderId}"})}),
                        new sap.m.Column({header: new sap.m.Label({text: "{i18n>freight}"})}),
                        new sap.m.Column({header: new sap.m.Label({text: "{i18n>shipAddress}"})})
                    ],
                    items: aColumnListItems
                }).addStyleClass("sapUiSmallMargin");

                oTable.addItem(oNewTable);
                this.showOrders2(oEvent);
            },

            showOrders2: function (oEvent) {

                let oHBox = this.byId("ordersTable");
                    //oHBox.destroyItems();

                let oItem = oEvent.getSource(),
                    oBindingContext = oItem.getBindingContext("jsonEmployees");

                let oNewTable = new sap.m.Table();
                    oNewTable.setWidth("auto");
                    oNewTable.addStyleClass("sapUiSmallMargin");

                let oColumnOrderID = new sap.m.Column(),
                    oLabelOrderId = new sap.m.Label();
                    oLabelOrderId.bindProperty("text", "i18n>orderId");
                    oColumnOrderID.setHeader(oLabelOrderId);
                    oNewTable.addColumn(oColumnOrderID);

                let oColumnFreight = new sap.m.Column(),
                    oLabelFreight = new sap.m.Label();
                    oLabelFreight.bindProperty("text", "i18n>freight");
                    oColumnFreight.setHeader(oLabelFreight);
                    oNewTable.addColumn(oColumnFreight);

                let oColumnShipAddress = new sap.m.Column(),
                    oLabelShipAddress = new sap.m.Label();
                    oLabelShipAddress.bindProperty("text", "i18n>shipAddress");
                    oColumnShipAddress.setHeader(oLabelShipAddress);
                    oNewTable.addColumn(oColumnShipAddress);

                let oColumnListItem = new sap.m.ColumnListItem();
                
                let oCellOrderId = new sap.m.Label();
                    oCellOrderId.bindProperty("text", "jsonEmployees>OrderID");
                    oColumnListItem.addCell(oCellOrderId);

                let oCellFreight= new sap.m.Label();
                    oCellFreight.bindProperty("text", "jsonEmployees>Freight");
                    oColumnListItem.addCell(oCellFreight);

                let oCellShipAddress= new sap.m.Label();
                    oCellShipAddress.bindProperty("text", "jsonEmployees>ShipAddress");
                    oColumnListItem.addCell(oCellShipAddress);

                let oBindingInfo = {
                    model: "jsonEmployees",
                    path:'Orders',
                    template: oColumnListItem
                };

                oNewTable.bindAggregation("items", oBindingInfo);
                //"jsonEmployees>/Orders"
                oNewTable.bindElement("jsonEmployees>"+oBindingContext.getPath());

                oHBox.addItem(oNewTable);
            },

            showOrders3: function (oEvent) {
                let oIconPressed = oEvent.getSource(),
                    oBindingContext = oIconPressed.getBindingContext("jsonEmployees"),
                    sPath = oBindingContext.getPath(),
                    oView = this.getView();
                
                    if (!this.pDialogOrders) {
                        this._pDialogOrders = Fragment.load({
                            id: oView.getId(),
                            name: "employees.fragment.DialogOrders",
                            controller: this
                        }).then(function (oDialog) {
                            oView.addDependent(oDialog);
                            return oDialog;
                        });
                    }
                    
                    //  /Employees/0/
                    this._pDialogOrders.then(function (oDialog) {
                        oDialog.bindElement("jsonEmployees>"+sPath);
                        oDialog.open();
                    });
            },

            onCloseOrders: function () {
                this._pDialogOrders.then(function (oDialog) {
                    oDialog.close();
                }); 
            },

            showDetails: function (oEvent) {
                let sPath = oEvent.getSource().getBindingContext("jsonEmployees").getPath();
                // this._oEventBus.publish("sChannelID, sEventNameID, oObject");
                this._oEventBus.publish("flexible","showDetails", sPath);
            }
        });
    });
