sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demo.ui.controller.View1", {
            onInit: function () {
                const router = this.getOwnerComponent().getRouter();
                router.getRoute("RouteView1").attachPatternMatched(this._onObjectMatched, this);
               
            },

            onPress: function () {
                //https://sapui5.hana.ondemand.com/#/topic/6c47b2b39db9404582994070ec3d57a2%23loio4c4cd99af9b14e08bb72470cc7cabff4
                const that = this;
                this.getView().getModel().submitChanges({
                    success: function () {
                        if (that.getView().getModel().hasPendingChanges()) {
                            console.log("submit failed");
                        } else {
                            console.log("submit success");
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }

                })
            },

            _onObjectMatched: function () {
                const model = this.getOwnerComponent().getModel();
                const context = model.createEntry("/Order", { 
                                        properties: {
                                            customer        : 'abc'
                                        } })                    
                this.getView().setBindingContext(context);

                const table = this.getView().byId("table");                                            
                const itemsBinding = table.getBinding("rows");
                itemsBinding.create({itemNo: 1, product: "apple", quantity: 1});
            }
        
        });
    });
