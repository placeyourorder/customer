/* 
* @Author: renjithks
* @Date:   2015-10-21 23:41:17
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-07 18:12:19
*/

'use strict';

Ext.define('Customer.controller.cart.CartPaymentController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      cartCheckoutView: '#cart-checkout',
      paymentView: '#cart-payment-view',
      checkoutButtons: '#cart-checkout #checkout-segmented-btns',
      nextButton: '#cart-payment-view #next'
    },
    control: {
      paymentView: {
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
    btns.getAt(3).setDisabled(false);
    btns.getAt(4).setDisabled(true);
  },

  _onNextButton: function() {
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    cart.set('payment', {});
    var btn = this.getCartCheckoutView().down('#checkout-segmented-btns').down('#check');
    this.getCartCheckoutView().down('#checkout-segmented-btns').setPressedButtons([btn]);
  }
})