/* 
* @Author: renjithks
* @Date:   2015-10-21 23:15:51
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:16:24
*/

'use strict';

Ext.define('Customer.view.cart.CartDeliverySlotView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-deliveryslot-view',

  config: {
    id: 'cart-deliveryslot-view',
    layout: 'fit',
    items: [{
      xtype: 'label',
      html: 'Delivery Slot Container'
    }]
  }
})