/* 
* @Author: renjithks
* @Date:   2015-06-25 23:06:52
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-12 16:16:21
*/
Ext.define('Customer.store.ItemStore', {
  extend: 'Ext.data.Store',
  requires: [
    //'Ext.data.proxy.JsonP'
  ],
  config: {
    model: 'Customer.model.ItemModel',
    proxy: {
      type: 'jsonp',
      url: '',
      callbackKey: 'callback'
    }
  }
});