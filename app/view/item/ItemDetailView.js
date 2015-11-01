/* 
 * @Author: renjithks
 * @Date:   2015-10-17 22:22:08
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-17 23:19:43
 */

'use strict';

Ext.define('Customer.view.item.ItemDetailView', {
  extend: 'Customer.view.Main',
  alias: 'widget.item-detail-view',

  config: {
    id: 'item-details',
    barTitle: 'Item',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'carousel',
      itemId: 'item-images',
      flex: 1
    }, {
      xtype: 'label',
      itemId: 'name'
    }, {
      xtype: 'label',
      itemId: 'description'
    }, {
      height: '44px',
      layout: 'hbox',
      items: [{
        xtype: 'button',
        itemId: 'add-to-cart',
        text: 'Add to cart!',
        flex: 1
      }, {
        xtype: 'button',
        itemId: 'add-to-whishlist',
        text: 'Add to wishlist!',
        flex: 1
      }]
    }]
  }
})
