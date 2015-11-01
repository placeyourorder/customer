/* 
* @Author: renjithks
* @Date:   2015-06-29 14:35:11
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:18
*/
Ext.define('Customer.store.OrderStore', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Customer.model.OrderModel',
    proxy: {
      type: 'jsonp',
      url: '',
      callbackKey: 'callback'
    },
  },
});