/* 
* @Author: renjithks
* @Date:   2015-10-23 00:54:59
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-01 22:58:42
*/

'use strict';

Ext.define('Customer.store.user.AddressStore', {
  extend: 'Ext.data.Store',

  config: {
    fields: ['address1', 'address2', 'address3', 'city', 'selected']
  }
});