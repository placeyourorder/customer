Ext.define('Pyo.customer.model.StoreDetailsModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['_id', 'name', 'quantity', 'uom', 'price', 'store_id', 'variations']
    }
});