/* 
 * @Author: renjithks
 * @Date:   2015-06-30 22:19:17
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-23 02:11:28
 */
Ext.define('Pyo.customer.model.CartModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['store_id', 'order_type', 'address', 'store_details', 'lineItems', {
      name: 'phone',
      defaultValue: 98989898989
    }, {
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
    }],
    hasMany: {
      model: 'LineItems',
      name: 'lineItems'
    },
    hasOne: {
      model: 'customer.model.address',
      name: 'address'
    },
    hasOne: {
      model: 'StoreDetails',
      name: 'store_details'
    }
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
    belongsTo: 'Pyo.customer.model.CartModel'
  }
});


Ext.define('LineItems', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['item_id', 'store_id', 'name', 'quantity', 'price', 'total_price'],
    belongsTo: 'Pyo.customer.model.CartModel',
    hasOne: {
      model: 'Variant',
      name: 'variant'
    }
  }
});

Ext.define('Variant', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'uom', 'quantity'],
    belongsTo: 'LineItems'
  }
});