/* 
 * @Author: renjithks
 * @Date:   2015-08-06 00:52:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-06 09:20:53
 */

'use strict';

Ext.define('Pyo.customer.model.UserForgotPasswordModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'Email',
      type: 'string'
    }],
    validations: [{
      type: 'presence',
      field: 'Email',
      message: 'is required.'
    }, {
      type: 'length',
      field: 'Email',
      min: 5,
      max: 32,
      message: 'is not in valid range.'
    }]
  }
});