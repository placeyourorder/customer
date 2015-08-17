/* 
 * @Author: renjithks
 * @Date:   2015-07-14 01:45:51
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-12 14:44:25
 */

'use strict';

Ext.define('Pyo.customer.controller.CategoryController', {
  extend: 'Pyo.customer.controller.MainController',

  config: {
    storeId: null,
    routes: {
      'stores/:storeId/categories': '_getStoreCategories'
    },
    refs: {
      categoryView: '#category-view',
      categoryList: '#category-view #list'
    },
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
    view = Ext.create('Pyo.customer.view.CategoryView');
    Ext.Viewport.setActiveItem(view);
    view.setHref(window.location.hash);
    var store = Ext.create('Pyo.customer.store.CategoryStore');
    var url = Pyo.customer.util.Constants.SERVER_URL + '/stores/' + storeId + '/categories';
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
  }
});