/* 
* @Author: renjithks
* @Date:   2015-10-21 23:42:42
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:43:17
*/

'use strict';

Ext.define('Customer.controller.cart.CartReviewController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      reviewView: '#cart-review-view'
    }
  },

  _showView: function() {
    console.log('In cart review controller');
    var view = this.getReviewView();
    if(!view) {
      view = Ext.create('Customer.view.cart.CartReviewView');
    }
  }
})