sap.ui.define([
	
], function() {
	
    let oFormatter = {

        dateFormat: function (date) {


            let iTimeDay = 24 * 60 * 60 * 1000;

            if (date) {
                let oDateNow = new Date();
                let oDateFormatOnlyDate = sap.ui.core.format.DateFormat.getDateInstance({pattern: "yyyy/MM/dd"});
                let oDateFormat = new Date(oDateFormatOnlyDate.format(oDateNow));
                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                switch (true) {
                    //today
                    case date.getTime() === oDateFormat.getTime():

                        return oResourceBundle.getText("today");
                    //tomorrow
                    case date.getTime() === oDateFormat.getTime() + iTimeDay:
                        return oResourceBundle.getText("tomorrow");
                    //yesterday
                    case date.getTime() === oDateFormat.getTime() - iTimeDay:
                        return oResourceBundle.getText("yesterday");
                    default: 
                        return '';
                }
            }
        }
    };

    return oFormatter;
});