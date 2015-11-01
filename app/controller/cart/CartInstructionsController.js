/* 
* @Author: renjithks
* @Date:   2015-10-21 23:38:14
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:39:10
*/

'use strict';

Ext.define('Customer.controller.cart.CartInstructionsController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      instructionsView: '#cart-instructions-view'
    }
  },

  _showView: function() {
    console.log('In cart instruction controller');
    var view = this.getInstructionsView();
    if(!view) {
      view = Ext.create('Customer.view.cart.CartInstructionsView');
    }
  }
})