/* 
* @Author: renjithks
* @Date:   2015-10-21 23:42:42
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-09 01:51:09
*/

'use strict';

Ext.define('Customer.controller.cart.CartReviewController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      cartCheckoutView: '#cart-checkout',
      reviewView: '#cart-review-view',
      addressContainer: '#cart-review-view #address-container',
      deliveryContainer: '#cart-review-view #deliveryslot-container',
      paymentContainer: '#cart-review-view #payment-container',
      orderContainer: '#cart-review-view #order-container',
      addressChange:  '#cart-review-view #change-address',
      deliveryChange:  '#cart-review-view #change-delivery',
      paymentChange:  '#cart-review-view #change-payment'
    },
    control: {
      reviewView: {
        show: '_showView',
        updatedata: '_onUpdateData'
      },
      addressChange: {
        tap: '_onAddressChangeTap'
      },
      deliveryChange: {
        tap: '_onDeliveryChangeTap'
      },
      paymentChange: {
        tap: '_onPaymentChangeTap'
      }
    },
    storeId: null
  },

  _showView: function() {
    this.setStoreId(this.getApplication().getController('Customer.controller.cart.CheckoutController').getStoreId());
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    this.getAddressContainer().down('#address').setData(cart.get('address'));
    this.getDeliveryContainer().down('#deliveryslot').setData(cart.get('delivery_slot'));
    this.getPaymentContainer().down('#payment').setData(cart.get('payment'));
    this.getOrderContainer().down('#order').setData(cart.getData());
  },

  _onAddressChangeTap: function() {
    var btn = this.getCartCheckoutView().down('#checkout-segmented-btns').down('#address');
    this.getCartCheckoutView().down('#checkout-segmented-btns').setPressedButtons([btn]);
  },

  _onDeliveryChangeTap: function() {
    var btn = this.getCartCheckoutView().down('#checkout-segmented-btns').down('#delivery-slot');
    this.getCartCheckoutView().down('#checkout-segmented-btns').setPressedButtons([btn]);
  },

  _onPaymentChangeTap: function() {
    var btn = this.getCartCheckoutView().down('#checkout-segmented-btns').down('#payment');
    this.getCartCheckoutView().down('#checkout-segmented-btns').setPressedButtons([btn]);
  }
})