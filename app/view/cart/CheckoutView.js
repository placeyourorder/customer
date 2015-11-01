/* 
 * @Author: renjithks
 * @Date:   2015-08-22 18:28:29
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-21 23:14:26
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
        iconCls: 'map-pin',
        flex: 1,
      }, {
        iconCls: 'asterisk',
        flex: 1,
      }, {
        iconCls: 'clock-o',
        flex: 1
      }, {
        iconCls: 'credit-card',
        flex: 1
      }, {
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
    }, {
      xtype: 'button',
      height: '44px',
      text: 'Next',
      docked: 'bottom'
    }]
  }
});
