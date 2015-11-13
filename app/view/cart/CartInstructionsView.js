/* 
 * @Author: renjithks
 * @Date:   2015-10-21 23:14:45
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-05 01:13:09
 */

'use strict';

Ext.define('Customer.view.cart.CartInstructionsView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-instructions-view',

  config: {
    id: 'cart-instructions-view',
    layout: 'vbox',
    items: [{
      xtype: 'label',
      html: 'For this order',
      height: 30
    },{
      xtype: 'formpanel',
      itemId: 'fields',
      flex: 1,
      items: [{
        xtype: 'textfield',
        label: 'Full Name',
        name: 'name',
        required: true,
        listeners: {
          change: function(el, value) {
            var isDisabled = !value.trim().length || !this.up('#fields').getValues().phone.trim().length;
            this.up('#fields').up('#cart-instructions-view').down('#next').setDisabled(isDisabled);
          }
        }
      }, {
        xtype: 'textfield',
        component: {
          xtype: 'input',
          type: 'tel'
        },
        label: 'Phone',
        name: 'phone',
        required: true,
        minLength: 10,
        maxLength: 10,
        listeners: {
          change: function(el, value) {
            var isDisabled = !value.trim().length || !this.up('#fields').getValues().name.trim().length;
            this.up('#fields').up('#cart-instructions-view').down('#next').setDisabled(isDisabled);
          }
        }
      }, {
        xtype: 'textareafield',
        label: 'Instructions',
        maxRows: 4,
        name: 'instructions'
      }]
    }, {
      xtype: 'button',
      height: '44px',
      text: 'Next - Select Delivery Slot',
      itemId: 'next',
      docked: 'bottom',
      disabled: true
    }]
  }
})
