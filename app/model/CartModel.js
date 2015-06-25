Ext.define('Pyo.customer.model.CartModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['store_id', 'address', 'item_id', 'quantity', {
      name: 'phone',
      defaultValue: '98989898989'
    }],
    hasOne: {
      model: 'Variant',
      name: 'variant'
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

Ext.define('Variant', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id'],
    belongsTo: 'Pyo.customer.model.CartModel'
  }
});