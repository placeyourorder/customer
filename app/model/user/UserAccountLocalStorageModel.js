/* 
 * @Author: renjithks
 * @Date:   2015-08-16 21:47:06
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-17 04:15:41
 */

'use strict';

Ext.define('Pyo.customer.model.user.UserAccountLocalStorageModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'email', 'phone', 'address'],
    hasMany: {
      model: 'address',
      name: 'address'
    },
    identifier: {
      type: 'uuid'
    }
  }
});