/*
 * @Author: renjithks
 * @Date:   2015-07-14 01:47:21
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-18 19:58:36
 */

'use strict';

Ext.define('Pyo.customer.store.CategoryStore', {
  extend: 'Ext.data.Store',

  config: {
    model: 'Pyo.customer.model.CategoryModel',
    proxy: {
      type: 'ajax',
      url: ''
    }
  }
});