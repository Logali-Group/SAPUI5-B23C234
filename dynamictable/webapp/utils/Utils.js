sap.ui.define([
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/ObjectIdentifier",
    "sap/m/ObjectNumber",
    "sap/m/ColumnListItem"
],function (Table, Column, Label, Text, ObjectIdentifier, ObjectNumber, ColumnListItem) {

    let oUtils = {

        createTable: function (sModel, oController) {

            this._sModel = sModel;
            this._oController = oController;

            this._createTable();
        },

        _createColumns: function () {
            let oController = this._oController,
                oModel = oController.getOwnerComponent().getModel("columns"),
                oEntity = oModel.getProperty("/"+this._sModel),
                aColumns = [];
            
                oEntity.forEach((oItem)=>{
                    let sName = oItem.i18n,
                        oColumn = new Column({
                            header:new Label({
                                text: sName
                            })
                        });
                    aColumns.push(oColumn);
                });
            return aColumns;
        },

        _createItems: function () {
            let oController = this._oController,
                oModel = oController.getOwnerComponent().getModel("columns"),
                oEntity = oModel.getProperty("/"+this._sModel),
                aItems = [];

            oEntity.forEach((oItem)=>{
                let sName = oItem.Name;

                switch(oItem.Control){
                    case 'Label': 
                        aItems.push(new Label({
                            text: `{northwind>${sName}}`
                        }));
                    break;
                    case 'Text':
                        aItems.push(new Text({
                            text: `{northwind>${sName}}`
                        }));
                    break;
                    case 'ObjectIdentifier':
                        aItems.push(new ObjectIdentifier({
                            title: `{northwind>${sName}}`
                        }));
                    break;
                    case 'ObjectNumber':
                        aItems.push(new ObjectNumber({
                            number: `{northwind>${sName}}`,
                            unit: `${oItem.Unit}`
                        }));
                    break;
                    default: new Error();
                }
            });

            let oColumnListItem = new ColumnListItem({
                cells:aItems
            });

            return oColumnListItem;
        },

        _createTable: function () {

            let oFlexBox = this._oController.byId("flexbox");
                oFlexBox.destroyItems();

            let aColumns = this._createColumns(),
                oTemplate = this._createItems();

            let oTable = new Table({
                headerText: this._sModel,
                columns: aColumns,
                width:"auto"
            });

            oTable.bindItems(`northwind>/${this._sModel}`, oTemplate);
            oFlexBox.addItem(oTable);
        }
    };

    return oUtils;
});