/* 
* @Author: renjithks
* @Date:   2015-06-29 00:12:20
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:11
*/
Ext.define('Pyo.customer.controller.ItemListController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'stores/:storeId': 'showItemDetails'
    },
    refs: {
      itemListView: '#store-detail-view'
    }
  },

  showItemDetails: function(storeId) {
    var me = this;
    view = Ext.create('Pyo.customer.view.ItemListView');

    if (null == Ext.getStore('cartStore')) {
      Ext.create('Pyo.customer.store.CartStore', {
        storeId: 'cartStore'
      });
    }
    view.setCartStore(Ext.getStore('cartStore'));
    view.down('#cartIcon').on('tap', function(Obj, e, eOpts) {
      console.log('stores/' + storeId + '/cart');
      Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
      this.redirectTo('stores/' + storeId + '/cart');
    }, this);
    view.setStoreId(storeId);
    Ext.Viewport.setActiveItem(view);

    var url = Pyo.customer.util.Constants.SERVER_URL + '/stores/' + storeId + '/items';
    var store = Ext.create('Pyo.customer.store.ItemListStore');
    store.getProxy().setUrl(url);
    store.load({
      callback: function() {
        view.down('#list').setStore(store);
      }
    });
  },
});