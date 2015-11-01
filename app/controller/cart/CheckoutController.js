/* 
 * @Author: renjithks
 * @Date:   2015-08-22 17:09:26
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-22 12:24:11
 */

'use strict';

Ext.define('Customer.controller.cart.CheckoutController', {
  extend: 'Ext.app.Controller',

  config: {
    storeId: null,
    routes: {
      'stores/:storeId/cart/checkout': '_showView'
    },
    refs: {
      cartCheckoutView: '#cart-checkout',
      checkoutButtons: '#cart-checkout #checkout-segmented-btns'
    },
    control: {
      checkoutButtons: {
        toggle: '_onCheckoutSegmentedBtnTap'
      }
    },
    cards: {
      'address' : 0,
      'instructions': 1,
      'delivery_slot': 2,
      'payment': 3,
      'review': 4
    }
  },

  _showView: function(storeId) {

    var me = this;
    var view = this.getCartCheckoutView();
    if (null == view) {
      view = Ext.create('Customer.view.cart.CheckoutView');
    }
    Ext.Viewport.setActiveItem(view);
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(storeId);
    var isAddressSet =  false;
    var isInstructionsSet = false;
    var isDeliverySlotSet = false;
    var isPaymentSet = false;
    var redirectTo = 'address';
    console.log(cart);
    if(cart.get('address')._id) {
      isAddressSet =  true;
    }
    if(cart.get('instructions')) {
      isInstructionsSet = true;
    }
    if(cart.get('delivery_slot')) {
      isDeliverySlotSet = true;
    }
    if(cart.get('payment')) {
      isPaymentSet = true;
    }
    var isOrderReadyToReview = (isAddressSet && isInstructionsSet && isPaymentSet && isDeliverySlotSet);
    redirectTo = isAddressSet ? 'instructions' : redirectTo;
    redirectTo = (isAddressSet && isInstructionsSet) ? 'delivery_slot' : redirectTo;
    redirectTo = (isAddressSet && isInstructionsSet && isDeliverySlotSet) ? 'payment' : redirectTo;
    redirectTo = isOrderReadyToReview ? 'review' : redirectTo;

    var btns = this.getCheckoutButtons();
    btns.setPressedButtons([this.getCards()[redirectTo]]);
    btns.getAt(0).setDisabled(!isAddressSet);
    btns.getAt(1).setDisabled(!isInstructionsSet);
    btns.getAt(2).setDisabled(!isDeliverySlotSet);
    btns.getAt(3).setDisabled(!isPaymentSet);
    btns.getAt(4).setDisabled(!isOrderReadyToReview);
    view.down('#cards').setActiveItem(this.getCards()[redirectTo]);
  },

  _onCheckoutSegmentedBtnTap: function(container, button, pressed) {
    if(pressed) {
      var btnIndex = this.getCheckoutButtons().indexOf(button);
      this.getCartCheckoutView().down('#cards').setActiveItem(btnIndex);
    }
  },

  _showOrder: function(store) {
    var view;
    if (null == this.getOrderCheckoutView()) {
      view = Ext.create('Customer.view.cart.CheckoutView');
    } else {
      this.getOrderCheckoutView().destroy();
      view = Ext.create('Customer.view.cart.CheckoutView');
    }
    Ext.Viewport.setActiveItem(view);
  },

  _orderSubmit: function() {
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    var orderJson = {
      store_id: this.getStoreId(),
      store_details: cart.data.store_details,
      address: cart.data.address,
      phone: cart.data.phone,
      order_type: cart.data.order_type,
      total_price: cart.data.total_price,
      line_items: []
    };
    var lineItems = orderJson.line_items;
    _.each(cart.lineItemsStore.getData().items, function(item) {
      lineItems.push({
        item_id: item.data.item_id,
        quantity: item.data.quantity,
        name: item.data.name,
        variant: {
          _id: item.getVariant().get('_id'),
          uom: item.getVariant().get('uom'),
          quantity: item.getVariant().get('quantity'),
        }
      });
    });
    var me = this;
    Ext.Ajax.request({
      url: Customer.util.Constants.SERVER_URL + '/stores/' + this.getStoreId() + '/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: orderJson,
      success: function(conn, response, options, eOpts) {
        store.getProxy().clear();
        store.data.clear();
        store.sync();
        me.redirectTo('users/orders');
      },
      failure: function(conn, response, options, eOpts) {
        if (response.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  }
});