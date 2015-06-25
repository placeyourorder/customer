Ext.define('Pyo.customer.store.StoreDetailsStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  config: {
    model: 'Pyo.customer.model.StoreDetailsModel',
    proxy: {
      type: 'jsonp',
      url: '',
      callbackKey: 'callback'
    },
    grouper: {
      groupFn: function(record) {
        return 'List of items';
      }
    }
  }
});