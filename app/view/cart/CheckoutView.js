/* 
 * @Author: renjithks
 * @Date:   2015-08-22 18:28:29
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-05 00:41:38
 */

Ext.define('Customer.view.cart.CheckoutView', {
  extend: 'Customer.view.Main',
  alias: 'widget.ordercheckout-view',

  config: {
    id: 'cart-checkout',
    layout: 'vbox',
    barTitle: 'Checkout',
    items: [{
      xtype: 'segmentedbutton',
      itemId: 'checkout-segmented-btns',
      height: '44px',
      width: '100%',
      layout: 'hbox',
      items: [{
        itemId: 'address',
        iconCls: 'map-pin',
        flex: 1,
      }, {
        itemId: 'instructons',
        iconCls: 'asterisk',
        flex: 1,
      }, {
        itemId: 'delivery-slot',
        iconCls: 'clock-o',
        flex: 1
      }, {
        itemId: 'payment',
        iconCls: 'credit-card',
        flex: 1
      }, {
        itemId: 'check',
        iconCls: 'check',
        flex: 1
      }]
    }, {
      layout: 'card',
      itemId: 'cards',
      flex: 1,
      items: [{
        xtype: 'cart-address-view',
      }, {
        xtype: 'cart-instructions-view',
      }, {
        xtype: 'cart-deliveryslot-view',
      }, {
        xtype: 'cart-payment-view',
      }, {
        xtype: 'cart-review-view',
      }]
    }]
  }
});
