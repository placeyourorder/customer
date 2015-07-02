/* 
* @Author: renjithks
* @Date:   2015-06-29 15:10:56
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:18
*/
Ext.define('Pyo.customer.store.CartStore', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Pyo.customer.model.CartModel'
  },

  addItem: function(item, variant, quantity) {
    var data = item.data;
    var cart = this.getCartForStore(data.store_id);
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
      var currentVariant = _.where(data.variations, {
        _id: variant
      })[0];
      lineItem = lineItem.data;
      lineItem.quantity += quantity;
      lineItem.price = currentVariant.price;
      lineItem.total_price = lineItem.quantity * lineItem.price;
    }

    cart.data.total_price = 0;
    _.each(cart.lineItemsStore.getData().items, function(item) {
      cart.data.total_price += item.data.total_price;
    });
  },

  initializeCart: function(item, variant, quantity) {
    var data = item.data;
    var cart = {
      store_id: data.store_id,
      address: {},
      total_price: 0,
      lineItems: []
    };

    var lineItem = this.initializeLineItem(item, variant, quantity);
    cart.total_price += lineItem.total_price;
    cart.lineItems.push(lineItem);

    return cart;
  },

  initializeLineItem: function(item, variant, quantity) {
    var data = item.data;
    var lineItem = {
      quantity: 0
    };
    var currentVariant = _.where(data.variations, {
      _id: variant
    })[0];

    lineItem.item_id = data._id;
    lineItem.name = data.name;
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