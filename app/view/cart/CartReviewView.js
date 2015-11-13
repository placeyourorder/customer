/* 
* @Author: renjithks
* @Date:   2015-10-21 23:17:20
* @Last Modified by:   renjithks
* @Last Modified time: 2015-11-09 01:22:04
*/

'use strict';

Ext.define('Customer.view.cart.CartReviewView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-review-view',

  config: {
    id: 'cart-review-view',
    layout: 'vbox',
    scrollable: true,
    items: [{
      xtype: 'label',
      html: 'Are these correct?'
    }, {
      xtype: 'container',
      layout: 'hbox',
      itemId: 'address-container',
      items: [{
        itemId: 'address',
        tpl: new Ext.XTemplate('{address1}, {address2}'),
        flex: 1
      }, {
        xtype: 'button',
        itemId: 'change-address',
        iconCls: 'pencil',
        width: '40px'
      }]
    }, {
      xtype: 'container',
      layout: 'hbox',
      itemId: 'deliveryslot-container',
      items: [{
        itemId: 'deliveryslot',
        tpl: new Ext.XTemplate('{from} - {to}'),
        flex: 1
      }, {
        xtype: 'button',
        itemId: 'change-delivery',
        iconCls: 'pencil',
        width: '40px'
      }]
    }, {
      xtype: 'container',
      layout: 'hbox',
      itemId: 'payment-container',
      items: [{
        itemId: 'payment',
        tpl: new Ext.XTemplate('Payment'),
        flex: 1
      }, {
        xtype: 'button',
        itemId: 'change-payment',
        iconCls: 'pencil',
        width: '40px'
      }]
    }, {
      xtype: 'container',
      layout: 'hbox',
      itemId: 'order-container',
      items: [{
        itemId: 'order',
        tpl: new Ext.XTemplate('Total: {total_price}'),
        flex: 1
      }]
    }]
  }
})