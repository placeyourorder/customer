/* 
 * @Author: renjithks
 * @Date:   2015-10-17 22:43:50
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-18 02:40:43
 */

'use strict';
Ext.define('Customer.controller.item.ItemDetailsController', {
  extend: 'Customer.controller.MainController',

  config: {
    storeId: null,
    itemId: null,
    variantId: null,
    itemDetails: null,
    routes: {
      'stores/:storeId/items/:itemId/variant/:variantId': '_showView'
    },
    refs: {
      itemDetailView: '#item-details',
      addToCart: '#item-details #add-to-cart'
    },
    control: {
      addToCart: {
        tap: '_addToCart'
      }
    }
  },

  _showView: function(storeId, itemId, variantId) {
    this.setStoreId(storeId);
    this.setItemId(itemId);
    this.setVariantId(variantId);
    var view = this.getItemDetailView();
    if (!view) {
      var me = this;
      view = Ext.create('Customer.view.item.ItemDetailView');
      view.addTitleBarButton('cart-icon', 'cart', 'right', null, function() {
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        me.redirectTo('stores/' + me.getStoreId() + '/cart');
      });
    }
    Ext.Viewport.setActiveItem(view);
    this._setData();
  },

  _setData: function() {
    var store = Ext.getStore('itemStore');
    if (store) {
      var record = store.findRecord('id', this.getItemId());
    }
    this.setItemDetails(record);
    if (record) {
      var imageCarousel = this.getItemDetailView().down('#item-images')
        //imageCarousel.removeAll(true, true);
      var images = record.get('images');
      var items = [];
      _.each(images.medium, function(img) {
        items.push({
          xtype: 'image',
          src: img
        });
      });
      imageCarousel.setItems(items);
      this.getItemDetailView().down('#name').setHtml(record.get('name'));
      this.getItemDetailView().down('#description').setHtml(record.get('description'));
    }
  },

  _addToCart: function() {
    var item = this.getItemDetails();
    var cart =  Ext.getStore('cartStore');
    cart.addItem(item, this.getVariantId(), 1);
  }
});
