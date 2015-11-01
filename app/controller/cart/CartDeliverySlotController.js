/* 
* @Author: renjithks
* @Date:   2015-10-21 23:39:57
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:41:01
*/

'use strict';

Ext.define('Customer.controller.cart.CartDeliverySlotController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      deliverySlotView: '#cart-deliveryslot-view'
    }
  },

  _showView: function() {
    console.log('In cart deliverylot controller');
    var view = this.getDeliverySlotView();
    if(!view) {
      view = Ext.create('Customer.view.cart.CartDeliverySlotView');
    }
  }
})