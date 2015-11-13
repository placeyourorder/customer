/* 
* @Author: renjithks
* @Date:   2015-10-21 23:39:57
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-09 01:03:24
*/

'use strict';

Ext.define('Customer.controller.cart.CartDeliverySlotController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      cartCheckoutView: '#cart-checkout',
      deliverySlotView: '#cart-deliveryslot-view',
      checkoutButtons: '#cart-checkout #checkout-segmented-btns',
      nextButton: '#cart-deliveryslot-view #next'
    },
    control: {
      deliverySlotView: {
        show: '_showView'
      },
      nextButton: {
        tap: '_onNextButton'
      }
    },
    storeId: null
  },

  _showView: function() {
    this.setStoreId(this.getApplication().getController('Customer.controller.cart.CheckoutController').getStoreId());
    var btns = this.getCheckoutButtons();
    btns.getAt(0).setDisabled(false);
    btns.getAt(1).setDisabled(false);
    btns.getAt(2).setDisabled(false);
    btns.getAt(3).setDisabled(true);
    btns.getAt(4).setDisabled(true);
  },

  _onNextButton: function() {
    var values = this.getDeliverySlotView().down('#fields').getValues();
    if(values.from > values.to) {
      Ext.Msg.alert('Ivalid time interval');
      return;
    }
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    cart.set('delivery_slot', {
      from : values.from,
      to: values.to
    });
    var btn = this.getCartCheckoutView().down('#checkout-segmented-btns').down('#payment');
    this.getCartCheckoutView().down('#checkout-segmented-btns').setPressedButtons([btn]);
  }
})