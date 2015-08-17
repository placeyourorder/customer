/* 
 * @Author: renjithks
 * @Date:   2015-06-22 21:26:07
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-15 00:09:08
 */
Ext.define('Pyo.customer.model.StoreModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'title', 'address']
  },
  hasOne: {
    model: 'customer.model.address',
    name: 'address'
  }
});