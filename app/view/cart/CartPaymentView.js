/* 
* @Author: renjithks
* @Date:   2015-10-21 23:16:40
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-07 16:15:24
*/

'use strict';

Ext.define('Customer.view.cart.CartPaymentView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-payment-view',

  config: {
    id: 'cart-payment-view',
    layout: 'fit',
    items: [{
      xtype: 'button',
      height: '44px',
      text: 'Next - Review Order',
      itemId: 'next',
      docked: 'bottom'
    }]
  }
})