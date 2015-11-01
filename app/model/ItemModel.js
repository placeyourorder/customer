/* 
* @Author: renjithks
* @Date:   2015-06-25 23:27:02
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-16 00:29:26
*/
Ext.define('Customer.model.ItemModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['id', 'name', 'description', 'quantity', 'uom', 'price', 'store_id', 'variantId', 'images']
  }
});