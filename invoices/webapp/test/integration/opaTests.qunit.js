
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "invoices/test/integration/NavigationJourney"
    ],function () {
        QUnit.start();
    });
});