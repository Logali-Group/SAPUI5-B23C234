sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(
	Controller,
	History,
	UIComponent
) {
	"use strict";

	return Controller.extend("invoices.controller.Details", {

		onInit: function () {
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
		},

		_onObjectMatch: function (oEvent) {
			this.byId("rating").reset();
			console.log(oEvent.getParameters());

			let oArgs = oEvent.getParameter("arguments"),
				sPath = oArgs.invoicePath;
			
			this.getView().bindElement({
				path: window.decodeURIComponent(sPath),
				model: "northwind"
			});

			console.log(this.getView().getBindingContext("northwind"));
		},

		onNavToBack: function () {
			let oHistory = History.getInstance(),
				sPreviusHash = oHistory.getPreviousHash();

			if (!sPreviusHash !== undefined) {
				window.history.go(-1);
			} else {
				let oRouter = UIComponent.getRouterFor(this);
					oRouter.navTo("RouteApp");
			}
		},
		
		onRatingChange: function (oEvent) {
			let fValue = oEvent.getParameter("value"),
				oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			sap.m.MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
		

	});
});