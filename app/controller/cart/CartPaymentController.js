/* 
* @Author: renjithks
* @Date:   2015-10-21 23:41:17
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:42:14
*/

'use strict';

Ext.define('Customer.controller.cart.CartPaymentController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      paymentView: '#cart-payment-view'
    }
  },

  _showView: function() {
    console.log('In cart payment controller');
    var view = this.getPaymentView();
    if(!view) {
      view = Ext.create('Customer.view.cart.CartPaymentView');
    }
  }
})