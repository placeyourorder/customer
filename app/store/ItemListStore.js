/* 
* @Author: renjithks
* @Date:   2015-06-25 23:06:52
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:18
*/
Ext.define('Pyo.customer.store.ItemListStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  config: {
    model: 'Pyo.customer.model.ItemListModel',
    proxy: {
      type: 'jsonp',
      url: '',
      callbackKey: 'callback'
    }
  }
});