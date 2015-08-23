/* 
 * @Author: renjithks
 * @Date:   2015-08-14 19:38:15
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-20 03:16:24
 */

'use strict';

Ext.define('customer.model.address', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'address1', 'address2', 'address3', 'city', 'state', 'country', 'zipcode', 'latitude', 'longitude'],
    belongsTo: [
      'Pyo.customer.model.StoreModel',
      'Pyo.customer.model.CartModel',
      'StoreDetails',
      'Pyo.customer.model.user.UserAccountLocalStorageModel'
    ]
  }
});