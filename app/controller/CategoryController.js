/* 
 * @Author: renjithks
 * @Date:   2015-07-14 01:45:51
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-06 03:44:44
 */

'use strict';

Ext.define('Customer.controller.CategoryController', {
  extend: 'Customer.controller.MainController',

  config: {
    storeId: null,
    routes: {
      'stores/:storeId/categories': '_getStoreCategories'
    },
    refs: {
      categoryView: '#category-view',
      categoryList: '#category-view #list',
      itemSearch: '#category-view #item-search'
    },
    control: {
      itemSearch: {
        action: '_onItemSearch'
      }
    }
  },

  _getStoreCategories: function(storeId) {
    var me = this;
    var view;
    var action = this.getActionFromHistory();
    if (action) {
      view = action.getController().getCategoryView();
      if (view && window.location.hash === view.getHref()) {
        //Ext.Viewport.animateActiveItem(view, this.slideRightTransition);
        Ext.Viewport.setActiveItem(view);
        return;
      }
    }
    if (this.getCategoryView()) {
      this.getCategoryView().destroy();
    }
    view = Ext.create('Customer.view.CategoryView');
    Ext.Viewport.setActiveItem(view);
    view.setHref(window.location.hash);
    var store = Ext.create('Customer.store.CategoryStore');
    var url = Customer.util.Constants.SERVER_URL + '/stores/' + storeId + '/categories';
    store.getProxy().setUrl(url);
    store.load({
      callback: function(records, operation, success) {
        if (!success && operation.getError().status == 401) {
          me.redirectTo('users/login');
          return;
        }
        me._setCategories(store);
      }
    });
    this.setStoreId(storeId);
  },

  _setCategories: function(store) {
    var data = store.getAt(0);
    var list = [];
    _.each(data.get('categories'), function(item, index) {
      list.push({
        'title': Object.keys(item)[0]
      });
    });
    this.getCategoryList().setData(list);
    this.getCategoryList().addListener('itemtap', function(list, index) {
      var cat = list.getData()[index].title;
      var queryParams = Ext.urlEncode({
        category: cat
      });
      this.redirectTo('stores/' + this.getStoreId() + '/items/?' + queryParams);
    }, this);
  },

  _onItemSearch: function(search, e, eOpts) {
    var queryParams = Ext.urlEncode({
      category: search.getValue()
    });
    this.redirectTo('stores/' + this.getStoreId() + '/items/?' + queryParams);
  }
});