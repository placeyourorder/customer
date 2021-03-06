/* 
* @Author: renjithks
* @Date:   2015-08-16 21:53:47
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-21 23:49:20
*/

'use strict';

Ext.define('Customer.store.user.UserAccountLocalStorageStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.LocalStorage'
  ],
  config: {
    model: 'Customer.model.user.UserAccountLocalStorageModel',
    autoLoad: true,
    // loginlocalstorage will be auto sync when this store is updated
    autoSync: true,
    proxy: {
      type: 'localstorage',
      id: 'useraccountlocalstorage'
    }
  }
});