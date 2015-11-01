/* 
* @Author: renjithks
* @Date:   2015-10-21 23:16:40
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:17:04
*/

'use strict';

Ext.define('Customer.view.cart.CartPaymentView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-payment-view',

  config: {
    id: 'cart-payment-view',
    layout: 'fit',
    items: [{
      xtype: 'label',
      html: 'Payment Container'
    }]
  }
})