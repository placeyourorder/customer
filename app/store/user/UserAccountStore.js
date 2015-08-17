/* 
* @Author: renjithks
* @Date:   2015-08-16 21:56:06
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-16 23:14:31
*/

'use strict';

Ext.define('Pyo.customer.store.user.UserAccountStore', {
  extend: 'Ext.data.Store',

  config: {
    model: 'Pyo.customer.model.user.UserAccountModel',
    proxy: {
      type: 'ajax',
    }
  }
});