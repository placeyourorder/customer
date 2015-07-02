/* 
* @Author: renjithks
* @Date:   2015-06-30 22:16:58
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:18
*/
Ext.define('Pyo.customer.model.OrderModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['store_id', 'address', 'total_price', {
      name: 'phone',
      defaultValue: 98989898989
    }],
    hasMany: {
      model: 'LineItems',
      name: 'line_items'
    },
    hasOne: {
      model: 'Address',
      name: 'address'
    }
  }
});

Ext.define('Address', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'address1',
      defaultValue: 'Street 1337'
    }, {
      name: 'city',
      defaultValue: 'Bangalore'
    }, {
      name: 'state',
      defaultValue: 'KA'
    }, {
      name: 'country',
      defaultValue: 'IN'
    }, {
      name: 'zipcode',
      defaultValue: '560102'
    }],
    belongsTo: 'Pyo.customer.model.CartModel'
  }
});

Ext.define('LineItems', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['item_id', 'name', 'quantity', 'price', 'total_price'],
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