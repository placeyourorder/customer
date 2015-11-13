/* 
 * @Author: renjithks
 * @Date:   2015-06-30 22:19:17
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-07 18:15:42
 */
Ext.define('Customer.model.CartModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['store_id', 'order_type', 'address', 'store_details', 'lineItems', 'phone', 'instructions', 'payment', 'delivery_slot', {
      name: 'total_price',
      persist: true,
      convert: function(v, r) {
        var orderTotal = 0;
        var lineItems = r.lineItemsStore ? r.lineItemsStore.getData().items : r.data.lineItems;
        _.each(lineItems, function(item) {
          orderTotal += (item.total_price ? parseFloat(item.total_price) : parseFloat(item.data.total_price));
        });
        return orderTotal.toFixed(2);
      }
    }]
  }
});

Ext.define('StoreDetails', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['title', 'address'],
    hasOne: {
      model: 'customer.model.address',
      name: 'address'
    },
    belongsTo: 'Customer.model.CartModel'
  }
});


Ext.define('LineItems', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['item_id', 'store_id', 'name', 'quantity', 'price', 'total_price'],
    belongsTo: 'Customer.model.CartModel',
    // hasOne: {
    //   model: 'Variant',
    //   name: 'variant'
    // }
  }
});

Ext.define('Variant', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'uom', 'quantity'],
    belongsTo: 'LineItems'
  }
});