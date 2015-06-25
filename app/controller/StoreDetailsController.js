Ext.define('Pyo.customer.controller.StoreDetailsController', {
  extend: 'Ext.app.Controller',

  config: {
    cartStore: null,
    routes: {
      'stores/:storeId': 'getItemDetails'
    },
    refs: {
      itemListView: '#store-detail-view-list'
    }
  },

  getItemDetails: function(storeId) {
    var me = this;
    var url = Pyo.customer.util.Constants.SERVER_URL + '/stores/' + storeId + '/items';
    var store = Ext.create('Pyo.customer.store.StoreDetailsStore');
    store.getProxy().setUrl(url);
    store.load({
      callback: function() {
        me._showItemDetails(store);
      }
    })
  },

  _showItemDetails: function(store) {
    var view = Ext.create('Pyo.customer.view.StoreDetailsView');
    this.setCartStore(Ext.create('Pyo.customer.store.CartStore'));
    this.getItemListView().setStore(store);
    //this.getItemListView().setCartStore(this.getCartStore());
    Ext.Viewport.add(view);
    Ext.Viewport.setActiveItem(view);
  }
});