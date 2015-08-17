/* 
 * @Author: renjithks
 * @Date:   2015-08-14 19:38:15
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-17 04:14:59
 */

'use strict';

Ext.define('customer.model.address', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['address1', 'city', 'state', 'country', 'zipcode'],
    belongsTo: [
      'Pyo.customer.model.StoreModel',
      'Pyo.customer.model.CartModel',
      'StoreDetails',
      'Pyo.customer.model.user.UserAccountLocalStorageModel'
    ]
  }
});