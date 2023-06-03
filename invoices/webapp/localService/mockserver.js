sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],function (MockServer, JSONModel, UriParameters, Log) {

    "use strict";

    var oMockServer,
        _sAppPath = "invoices/",
        _sJsonFilesPath = _sAppPath + "localService/mockdata";

    
    var oMockServerInterface = {
        init: function (oOptionsParameter) {
            var oOptions = oOptionsParameter || {};

            return new Promise(function (fnResolve, fnReject) {
                var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                    oManifestModel = new JSONModel(sManifestUrl);


                oManifestModel.attachRequestCompleted(function () {
                    var oUriParameters = new UriParameters(window.location.ref),
                        sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath),
                        oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/northwind"),
                        sMetadaUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri),
                        sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();
                        console.log(oMainDataSource.host+sMockServerUrl);
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: oMainDataSource.host+sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        }

                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 1000)
                        });

                        oMockServer.simulate(sMetadaUrl, {
                            sMockdataBaseUrl: sJsonFilesUrl,
                            bGenerateMissingMockData: true
                        });

                        var aRequests = oMockServer.getRequests();

                            oMockServer.setRequests(aRequests);
                            oMockServer.start();

                            Log.info("Running the app with mock data");
                            fnResolve();
                    });

                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Failed to load application manifest";
                        Log.error(sError);
                        fnReject(new Error(sError));
                    });

            });
        }
    };

    return oMockServerInterface;

});