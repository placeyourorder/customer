/* 
 * @Author: renjithks
 * @Date:   2015-06-29 00:12:20
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-12 15:00:24
 */
Ext.define('Pyo.customer.controller.ItemListController', {
  extend: 'Pyo.customer.controller.MainController',

  config: {
    routes: {
      'stores/:storeId/items/:params': {
        action: 'showItems',
        conditions: {
          ':params': '([0-9a-zA-Z\?\&=\-]+)'
        }
      }
    },
    refs: {
      itemListView: '#store-detail-view',
      addToCartButton: '#store-detail-view #list #itemAddButton'
    },
    control: {
      addToCartButton: {
        //tap: '_addToCart'
      }
    }
  },

  showItems: function(storeId, params) {
    var me = this;
    var view;
    var action = this.getActionFromHistory();
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
    view = Ext.create('Pyo.customer.view.ItemListView');
    view.addTitleBarButton('cart-icon', 'cart', 'right', '0', function() {
      Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
      me.redirectTo('stores/' + storeId + '/cart');
    });
    view.setHref(window.location.hash);
    var re = new RegExp(/([a-z0-9]+)=([^&]+)/gi);
    var values = params.match(re);
    var paramMap = {};
    _.each(values, function(val, idx, allValues) {
      var kvArr = val.split('=');
      paramMap[kvArr[0]] = kvArr[1];
    });

    if (null == Ext.getStore('cartStore')) {
      Ext.create('Pyo.customer.store.CartStore', {
        storeId: 'cartStore'
      });
    }
    view.setCartStore(Ext.getStore('cartStore'));
    view.setStoreId(storeId);
    Ext.Viewport.setActiveItem(view);

    var url = Pyo.customer.util.Constants.SERVER_URL + '/stores/' + storeId + '/items/search';
    var store = Ext.create('Pyo.customer.store.ItemListStore');
    store.getProxy().setUrl(url);
    Ext.Ajax.request({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: paramMap,
      success: function(conn, response, options, eOpts) {
        var data = Ext.decode(conn.responseText);
        store.setData(data);
        view.down('#list').setStore(store);
      },
      failure: function(conn, response, options, eOpts) {
        console.log(response);
        if (response.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  },

  _addToCart: function(obj, e, eOpts) {
  }
});