/* 
 * @Author: renjithks
 * @Date:   2015-08-06 01:19:03
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-06 01:19:37
 */

'use strict';

Ext.define('Customer.store.SessionInfo', {
  extend: 'Ext.data.Store',

  config: {
    model: 'Customer.model.SessionModel',
    autoLoad: true,

    proxy: {
      type: 'localstorage',
      id: 'myApplicationKey'
    }
  }
});