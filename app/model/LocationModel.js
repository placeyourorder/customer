/* 
 * @Author: renjithks
 * @Date:   2015-08-09 21:40:00
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-09 23:24:54
 */

'use strict';

Ext.define('Pyo.customer.model.LocationModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['latitude', 'longitude'],
    identifier: {
      type: 'uuid'
    }
  }
});