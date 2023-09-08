sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("demo.ui.controller.View1", {
            onInit: function () {
                const router = this.getOwnerComponent().getRouter();
                router.getRoute("RouteView1").attachPatternMatched(this._onObjectMatched, this);
                this._itemIndex = 0;
               
            },

            onSave: function () {
                const that = this;
                this.getView().getModel().submitChanges({
                    success: function () {
                        if (that.getView().getModel().hasPendingChanges()) {
                            MessageBox.error("Data was not fully saved");
                        } else {
                            MessageToast.show("Data saved successfully.");
                        }
                    },
                    error: function (error) {
                        MessageBox.error(JSON.stringify(error));
                    }
                })
            },

            onAdd: function () {
                this._itemIndex ++;
                const table = this.getView().byId("table");                                            
                const itemsBinding = table.getBinding("rows");
                itemsBinding.create({itemNo: this._itemIndex, product: "", quantity: 1}, true /*create at end*/);
            },

            onDelete: function () {
                const table = this.getView().byId("table");    
                const selectedIndices = table.getSelectedIndices();
                const rows = table.getRows();
                selectedIndices.map(index => {
                    rows[index].getBindingContext().delete();
                });
            },

            _onObjectMatched: function () {
                const model = this.getOwnerComponent().getModel();
                const context = model.createEntry("/Order", { 
                                        properties: {
                                            customer        : 'default'
                                        } })                    
                this.getView().setBindingContext(context);
            }
        });
    });
