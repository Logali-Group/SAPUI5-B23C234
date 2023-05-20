sap.ui.define([

],function () {

    let oFormatter = {

        invoicesStatus: function (sStatus) {

            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            switch (sStatus) {
                case 'A': return oResourceBundle.getText("invoiceStatusA");
                case 'B': return oResourceBundle.getText("invoiceStatusB");
                case 'C': return oResourceBundle.getText("invoiceStatusC");
            }
        },

        example: function () {

        }

    };

    //formatter.invoicesStatus
    //formatter.example

    return oFormatter;
    
});