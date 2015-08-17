/* 
 * @Author: renjithks
 * @Date:   2015-08-06 00:52:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-06 09:20:53
 */

'use strict';

Ext.define('Pyo.customer.model.UserRegistrationModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'Email',
      type: 'string'
    }, {
      name: 'Password',
      type: 'string'
    }, {
      name: 'Phone',
      type: 'number'
    }],
    validations: [{
      type: 'presence',
      field: 'Email',
      message: 'is required.'
    }, {
      type: 'presence',
      field: 'Password',
      message: 'is required.'
    }, {
      type: 'presence',
      field: 'Phone',
      message: 'is required.'
    }, {
      type: 'length',
      field: 'Email',
      min: 5,
      max: 32,
      message: 'is not in valid range.'
    }, {
      type: 'length',
      field: 'Password',
      min: 8,
      max: 16,
      message: 'is not in valid range.'
    }]
  }
});