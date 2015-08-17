/* 
 * @Author: renjithks
 * @Date:   2015-06-29 15:10:56
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-16 01:09:03
 */
Ext.define('Pyo.customer.store.CartStore', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Pyo.customer.model.CartModel'
  },

  addItem: function(item, variant, quantity) {
    var cart = this.getCartForStore(item.store_id);
    var lineItem;
    if (!cart) {
      cart = this.initializeCart(item, variant, quantity);
      this.addData(cart);
      return;
    }
    lineItem = _.find(cart.lineItemsStore.getData().items, function(obj) {
      return obj.getVariant().get('_id') === variant;
    });
    if (!lineItem) {
      lineItem = this.initializeLineItem(item, variant, quantity);
      cart.lineItemsStore.addData(lineItem);
    } else {
      var currentVariant = _.where(item.variations, {
        _id: variant
      })[0];
      lineItem = lineItem.data;
      lineItem.quantity += quantity;
      lineItem.price = currentVariant.price;
      lineItem.total_price = lineItem.quantity * lineItem.price;
    }
    cart.set('total_price', null);
  },

  updateItem: function(cart, item, quantity) {
    var variant = item.variant._id;
    var lineItem = _.find(cart.lineItemsStore.getData().items, function(obj) {
      return obj.getVariant().get('_id') === variant;
    });
    lineItem = lineItem.data;
    lineItem.quantity += quantity;
    if (lineItem.quantity < 1) {
      return;
    }
    //lineItem.total_price = lineItem.quantity * lineItem.price;
    cart.set('total_price', null);
    return cart;
  },

    initializeCart: function(item, variant, quantity) {
    var storeList = Ext.getStore('storeList');
    var store = storeList.findRecord('_id', item.store_id);
    var cart = {
      store_id: item.store_id,
      store_details: {
        title: store.data.title,
        address: store.data.address
      },
      address: {},
      lineItems: []
    };
    var lineItem = this.initializeLineItem(item, variant, quantity);
    cart.lineItems.push(lineItem);

    return cart;
  },

  initializeLineItem: function(item, variant, quantity) {
    var lineItem = {
      item_id: item._id,
      name: item.name,
      store_id: item.store_id,
      quantity: 0
    };
    var currentVariant = _.where(item.variations, {
      _id: variant
    })[0];

    lineItem.variant = {
      _id: variant,
      uom: currentVariant.uom,
      quantity: currentVariant.quantity
    };
    lineItem.quantity += quantity;
    lineItem.price = currentVariant.price;
    lineItem.total_price = lineItem.quantity * lineItem.price;

    return lineItem;
  },

  getCartForStore: function(storeId) {
    return _.find(this.getData().items, function(obj) {
      if (obj.data.store_id === storeId)
        return obj;
    });
  }
});