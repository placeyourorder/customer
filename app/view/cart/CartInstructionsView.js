/* 
* @Author: renjithks
* @Date:   2015-10-21 23:14:45
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:15:22
*/

'use strict';

Ext.define('Customer.view.cart.CartInstructionsView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-instructions-view',

  config: {
    id: 'cart-instructions-view',
    layout: 'fit',
    items: [{
      xtype: 'label',
      html: 'Instructions Container'
    }]
  }
})