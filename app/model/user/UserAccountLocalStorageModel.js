/* 
 * @Author: renjithks
 * @Date:   2015-08-16 21:47:06
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-22 00:02:07
 */

'use strict';

Ext.define('Customer.model.user.UserAccountLocalStorageModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'email', 'phone', 'address'],
    identifier: {
      type: 'uuid'
    }
  }
});