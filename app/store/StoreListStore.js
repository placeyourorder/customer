/* 
* @Author: renjithks
* @Date:   2015-06-22 21:48:33
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-15 00:32:21
*/
Ext.define('Pyo.customer.store.StoreListStore', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Pyo.customer.model.StoreModel',
    proxy: {
      type: 'ajax',
      url: ''
    }
  }
});