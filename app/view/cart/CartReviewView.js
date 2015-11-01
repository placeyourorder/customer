/* 
* @Author: renjithks
* @Date:   2015-10-21 23:17:20
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-21 23:20:41
*/

'use strict';

Ext.define('Customer.view.cart.CartReviewView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-review-view',

  config: {
    id: 'cart-review-view',
    layout: 'fit',
    items: [{
      xtype: 'label',
      html: 'Review Container'
    }]
  }
})