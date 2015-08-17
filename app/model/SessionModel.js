/* 
 * @Author: renjithks
 * @Date:   2015-08-06 01:17:58
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-06 01:18:21
 */

'use strict';

Ext.define('Pyo.customer.model.SessionModel', {
  extend: 'Ext.data.Model',
  config: {
    identifier: 'uuid',
    fields: [
      'sessionId'
    ]
  }
});