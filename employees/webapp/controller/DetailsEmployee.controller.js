sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "employees/model/formatter"
],function (Controller, formatter) {

    "use strict";

    return Controller.extend("employees.controller.DetailsEmployee",{

        callFormater: formatter,

        onInit: function () {
            
        },

        onCreateIncidence: function () {
            let oTableIncidence = this.byId("tableIncidence");
            let oNewIncidence = sap.ui.xmlfragment("employees.fragment.NewIncidence", this);
            let oIncidenceModel = this.getView().getModel("incidenceModel"),
                oData = oIncidenceModel.getData(),
                iIndex = oData.length;
                oData.push({index: iIndex + 1});
                oIncidenceModel.refresh();
                oNewIncidence.bindElement("incidenceModel>/"+iIndex);       //Asociacion del Modelo
            oTableIncidence.addContent(oNewIncidence);
        },

        onDeleteIncidence: function (oEvent) {
            let oTableIncidence = this.getView().byId("tableIncidence"),                //Obtiene el panel dinamico
                oRowIncidence = oEvent.getSource().getParent().getParent(),             //Obtiene el item o la fila
                oIncidenceModel = this.getView().getModel("incidenceModel"),            //Obtiene el modelo 'incidenceModel'
                oData = oIncidenceModel.getData(),                                      //Obtiene todos los items o las filas
                oBindingContext = oRowIncidence.getBindingContext("incidenceModel");    //Obtiene el enlace a cada item

                //Eliminamos
                oData.splice(oBindingContext.getProperty("index")-1,1);

                //Reordernar la secuencia de los index
                for (var i in oData) {
                    oData[i].index = parseInt(i) + 1;
                }

                oIncidenceModel.refresh();                      //Refrescamos el modelo
                oTableIncidence.removeContent(oRowIncidence);   //Eliminamos el contenido seleccionado del panel dinamico   

                for ( var j in oTableIncidence.getContent()) {
                    oTableIncidence.getContent()[j].bindElement("incidenceModel>/"+j);
                }
        }

    });

});