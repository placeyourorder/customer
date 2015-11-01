/*
 * @Author: renjithks
 * @Date:   2015-06-29 00:12:20
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-18 20:16:48
 */
Ext.define('Customer.controller.ItemListController', {
  extend: 'Customer.controller.MainController',

  config: {
    storeId: null,
    routes: {
      'stores/:storeId/items/:params': {
        action: 'showItems',
        conditions: {
          ':params': '\\S+'
        }
      }
    },
    refs: {
      itemListView: '#item-grid-view',
      itemSearch: '#item-grid-view #item-search',
      itemGrid: '#item-grid-view #grid'
    },
    control: {
      itemSearch: {
        action: '_onItemSearch'
      },
      itemGrid: {
        itemtap: '_onItemTap'
      }
    }
  },

  showItems: function(storeId, params) {
    console.log('In ItemListController');
    var me = this;
    var view;
    var action = this.getActionFromHistory();
    this.setStoreId(storeId);
    if (action) {
      view = action.getController().getItemListView();
      if (view && window.location.hash === view.getHref()) {
        //Ext.Viewport.animateActiveItem(view, this.slideRightTransition);
        Ext.Viewport.setActiveItem(view);
        return;
      }
    }
    if (this.getItemListView()) {
      this.getItemListView().destroy();
    }
    view = Ext.create('Customer.view.item.ItemGridView');
    view.addTitleBarButton('search-icon', 'search', 'right', '0', function() {
      //Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
      me.redirectTo('stores/' + storeId + '/items/search');
    });
    view.addTitleBarButton('cart-icon', 'cart', 'right', null, function() {
      Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
      me.redirectTo('stores/' + storeId + '/cart');
    });
    view.setHref(window.location.hash);

    var paramMap = Ext.urlDecode(params);
    if (null == Ext.getStore('cartStore')) {
      Ext.create('Customer.store.CartStore', {
        storeId: 'cartStore'
      });
    }

    Ext.Viewport.setActiveItem(view);
    var page = 0,
      limit = 16;
    var url = Customer.util.Constants.SERVER_URL + '/stores/' + storeId + '/items/search';
    url += '?page=' + page + '&limit=' + limit;
    Ext.Ajax.request({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: paramMap,
      success: function(conn, response, options, eOpts) {
        me._onDataFetchSuccess(Ext.decode(conn.responseText));
      },
      failure: function(conn, response, options, eOpts) {
        console.log(response);
        me.getItemListView().down('#no-data').setHidden(false);
        me.getItemListView().down('#grid').setHidden(true);
        if (response.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  },

  _onDataFetchSuccess: function(response) {
    if(response.data && !response.data.length) {
      this.getItemListView().down('#no-data').setHidden(false);
      this.getItemListView().down('#grid').setHidden(true);
      return;
    }
    var store = Ext.create('Customer.store.ItemStore', {
      storeId: 'itemStore'
    });
    var items = [];
    this.getItemListView().down('#no-data').setHidden(true);
    this.getItemListView().down('#grid').setHidden(false);
    _.each(response.data, function(el) {
      var item = {
        id: el._id,
        name: el.name,
        description: el.description,
        store_id: el.store_id,
        images: {}
      };
      if (el.images) {
          item.images.small = el.images.small ? el.images.small[0]: '';
          item.images.medium = el.images.medium ? el.images.medium: [];
          item.images.large = el.images.large ? el.images.large: [];
      }
      if (el.variations) {
        _.each(el.variations, function(variant) {
          item.variantId = variant._id;
          item.price = variant.price;
          item.uom = variant.uom;
          item.quantity = variant.quantity;
          items.push(item);
        });
      }
    });
    store.setTotalCount(response.pageCount);
    store.setData(items);
    this.getItemListView().down('#grid').setStore(store);
  },

  _addToCart: function(obj, e, eOpts) {},

  _onItemSearch: function(search, e, eOpts) {
    var queryParams = Ext.urlEncode({
      category: search.getValue()
    });
    this.redirectTo('stores/' + this.getStoreId() + '/items/?' + queryParams);
  },

  _onItemTap: function(itemGrid, index, target, record, e, eOpts ) {
    this.redirectTo('stores/' + this.getStoreId() + '/items/' + record.get('id') + '/variant/' + record.get('variantId'));
  }
});
