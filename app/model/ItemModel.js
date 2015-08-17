/* 
* @Author: renjithks
* @Date:   2015-06-25 23:27:02
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-15 00:07:40
*/
Ext.define('Pyo.customer.model.ItemModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'name', 'quantity', 'uom', 'price', 'store_id', 'variations']
  }
});