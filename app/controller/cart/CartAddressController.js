/* 
 * @Author: renjithks
 * @Date:   2015-10-21 01:36:21
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-02 00:10:43
 */

'use strict';

Ext.define('Customer.controller.cart.CartAddressController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      addressView: '#cart-address-view',
      addressList: '#cart-address-view #address-list',
      addressItem: '#cart-address-view addresslistitem'
    },
    control: {
      addressView: {
        show: '_showView'
      },
      addressItem: {
        addresstap: '_onAddressTap',
        editaddress: '_onEditAddressClick'
      }
    }
  },

  _showView: function(view) {
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    var addressList = userDetails.get('address');
    var cart = store.getCartForStore(storeId);
    var address = cart.getAddress();
    if (addressList && address) {
      addressList.forEach(function(address) {
        if (address._id = address._id) {
          address.selected = true;
        }
      });
    }
    this.getAddressList().getStore().setData(addressList);
  },

  _onAddressTap: function(record) {
    var store = this.getAddressList().getStore();
    var oldRecord = store.findRecord('selected', true);
    if (oldRecord) {
      oldRecord.set('selected', false);
    }
    var newRecord = store.findRecord('id', record.get('id'));
    newRecord.set('selected', true);
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(storeId);
    cart.set('address', record.getData());
  },

  _onEditAddressClick: function(record) {
    console.log(record, 'Edit address clicked..');
  }
})
