/* 
* @Author: renjithks
* @Date:   2015-06-22 21:48:33
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:18
*/
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