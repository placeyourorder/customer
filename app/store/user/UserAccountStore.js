/* 
* @Author: renjithks
* @Date:   2015-08-16 21:56:06
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-16 23:14:31
*/

'use strict';

Ext.define('Customer.store.user.UserAccountStore', {
  extend: 'Ext.data.Store',

  config: {
    model: 'Customer.model.user.UserAccountModel',
    proxy: {
      type: 'ajax',
    }
  }
});