/* 
* @Author: renjithks
* @Date:   2015-08-06 10:31:14
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-06 10:32:24
*/

'use strict';

Ext.define('Customer.model.UserLoginModel', {
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
    }]
  }
});