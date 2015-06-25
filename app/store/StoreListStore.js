Ext.define('Pyo.customer.store.StoreListStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  config: {
    model: 'Pyo.customer.model.StoreListModel',
    proxy: {
      type: 'jsonp',
      url: '',
      callbackKey: 'callback'
    },
    grouper: {
      groupFn: function(record) {
        return 'List of stores';
      }
    }
  }
});