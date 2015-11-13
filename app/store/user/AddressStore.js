/* 
* @Author: renjithks
* @Date:   2015-10-23 00:54:59
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-03 02:24:21
*/

'use strict';

Ext.define('Customer.store.user.AddressStore', {
  extend: 'Ext.data.Store',

  config: {
    fields: ['_id', 'address1', 'address2', 'address3', 'city', 'selected']
  }
});