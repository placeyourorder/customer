/* 
 * @Author: renjithks
 * @Date:   2015-08-06 01:19:03
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-06 01:19:37
 */

'use strict';

Ext.define('Pyo.customer.store.SessionInfo', {
  extend: 'Ext.data.Store',

  config: {
    model: 'Pyo.customer.model.SessionModel',
    autoLoad: true,

    proxy: {
      type: 'localstorage',
      id: 'myApplicationKey'
    }
  }
});