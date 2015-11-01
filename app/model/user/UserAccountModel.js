/* 
* @Author: renjithks
* @Date:   2015-08-16 21:55:25
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-17 00:26:48
*/

'use strict';

Ext.define('Customer.model.user.UserAccountModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'email', 'phone', 'address'],
    identifier: {
      type: 'uuid'
    },
    proxy: {
      type: 'ajax',
    }
  }
});