sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("invoices.controller.Details", {

		onInit: function () {
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
		},

		_onObjectMatch: function (oEvent) {
			console.log(oEvent.getParameters());
			let oArgs = oEvent.getParameter("arguments"),
				sPath = oArgs.invoicePath;
			
			this.getView().bindElement({
				path: window.decodeURIComponent(sPath),
				model: "northwind"
			});

			console.log(this.getView().getBindingContext("northwind"));
		}

	});
});