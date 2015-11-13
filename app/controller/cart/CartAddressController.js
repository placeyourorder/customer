/* 
 * @Author: renjithks
 * @Date:   2015-10-21 01:36:21
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-07 00:35:39
 */

'use strict';

Ext.define('Customer.controller.cart.CartAddressController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      cartCheckoutView: '#cart-checkout',
      addressView: '#cart-address-view',
      addressList: '#cart-address-view #address-list',
      addressItem: '#cart-address-view addresslistitem',
      checkoutButtons: '#cart-checkout #checkout-segmented-btns',
      nextButton: '#cart-address-view #next'
    },
    control: {
      addressView: {
        show: '_showView'
      },
      addressItem: {
        addresstap: '_onAddressTap',
        editaddress: '_onEditAddressClick'
      },
      nextButton: {
        tap: '_onNextTap'
      }
    },
    storeId: null
  },

  _showView: function(view) {
    this.getNextButton().setDisabled(true);
    this.setStoreId(this.getApplication().getController('Customer.controller.cart.CheckoutController').getStoreId());
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    var addressList = userDetails.get('address');
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    var address = cart.get('address');
    this.getAddressList().getStore().setData(addressList);
    this.getAddressList().getStore().load();

    if (addressList && address) {
      var me = this;
      this.getAddressList().getStore().each(function(item, index) {
        item.set('selected', false);
        if (cart.get('address')._id === item.get('_id')) {
          me.getNextButton().setDisabled(false);
          item.set('selected', true);
        }
      });
    }

    var btns = this.getCheckoutButtons();
    btns.getAt(0).setDisabled(false);
    btns.getAt(1).setDisabled(true);
    btns.getAt(2).setDisabled(true);
    btns.getAt(3).setDisabled(true);
    btns.getAt(4).setDisabled(true);
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
    var cart = store.getCartForStore(this.getStoreId());
    cart.set('address', record.getData());
    this.getNextButton().setDisabled(false);
  },

  _onEditAddressClick: function(record) {
    console.log(record, 'Edit address clicked..');
  },

  _onNextTap: function() {
    var btn = this.getCartCheckoutView().down('#checkout-segmented-btns').down('#instructons');
    this.getCartCheckoutView().down('#checkout-segmented-btns').setPressedButtons([btn]);
  }
})
