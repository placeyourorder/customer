/* 
* @Author: renjithks
* @Date:   2015-10-21 23:38:14
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-07 00:47:46
*/

'use strict';

Ext.define('Customer.controller.cart.CartInstructionsController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      cartCheckoutView: '#cart-checkout',
      instructionsView: '#cart-instructions-view',
      fields: '#cart-instructions-view #fields',
      nextButton: '#cart-instructions-view #next',
      checkoutButtons: '#cart-checkout #checkout-segmented-btns'
    },
    control: {
      instructionsView: {
        show: '_showView'
      },
      nextButton: {
        tap: '_onNextTap'
      }
    },
    storeId: null
  },

  _showView: function() {
    this.getNextButton().setDisabled(true);
    this.setStoreId(this.getApplication().getController('Customer.controller.cart.CheckoutController').getStoreId());
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    var instructions = cart.get('instructions');

    if(instructions) {
      this.getFields().setData(instructions);
    }
    this.getNextButton().setDisabled(!this.getFields().getValues().name || !this.getFields().getValues().phone);
    var btns = this.getCheckoutButtons();
    btns.getAt(0).setDisabled(false);
    btns.getAt(1).setDisabled(false);
    btns.getAt(2).setDisabled(true);
    btns.getAt(3).setDisabled(true);
    btns.getAt(4).setDisabled(true);
  },

  _onNextTap: function() {
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    var values = this.getFields().getValues();
    cart.set('instructions', values);
    var btn = this.getCheckoutButtons().down('#delivery-slot');
    this.getCheckoutButtons().setPressedButtons([btn]);
  }
})