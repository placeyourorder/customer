/* 
 * @Author: renjithks
 * @Date:   2015-10-21 23:15:51
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-07 15:54:05
 */

'use strict';

Ext.define('Customer.view.cart.CartDeliverySlotView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-deliveryslot-view',

  config: {
    id: 'cart-deliveryslot-view',
    layout: 'fit',
    items: [{
      xtype: 'formpanel',
      itemId: 'fields',
      items: [{
        xtype: 'datepickerfield',
        label: 'From',
        name: 'from',
        value: new Date()
      }, {
        xtype: 'datepickerfield',
        label: 'To',
        name: 'to',
        value: new Date()
      }]
    }, {
      xtype: 'button',
      height: '44px',
      text: 'Next - Payment',
      itemId: 'next',
      docked: 'bottom'
    }]
  }
})
