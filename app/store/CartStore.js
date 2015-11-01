/* 
 * @Author: renjithks
 * @Date:   2015-06-29 15:10:56
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-18 20:30:30
 */
Ext.define('Customer.store.CartStore', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Customer.model.CartModel'
  },

  addItem: function(item, variant, quantity) {
    var cart = this.getCartForStore(item.get('store_id'));
    var lineItem;
    if (!cart) {
      cart = this.initializeCart(item, variant, quantity);
      this.addData(cart);
      return;
    }
    lineItem = _.find(cart.get('lineItems'), function(obj) {
      return obj.variant._id === variant;
    });

    if (!lineItem) {
      lineItem = this.initializeLineItem(item, variant, quantity);
      cart.get('lineItems').push(lineItem);
    } else {
      this.updateLineItem(lineItem, quantity, item.get('price'));
    }
    cart.set('total_price', null);
  },

  updateLineItem: function(lineItem, quantity, price) {
    lineItem.quantity += quantity;
    lineItem.price = price;
    lineItem.total_price = lineItem.quantity * lineItem.price;
  },

  initializeCart: function(item, variant, quantity) {
    var storeList = Ext.getStore('storeList');
    var store = storeList.findRecord('_id', item.get('store_id'));
    var cart = {
      store_id: item.get('store_id'),
      order_type: 'DELIVER',
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
      item_id: item.get('id'),
      name: item.get('name'),
      store_id: item.get('store_id'),
      quantity: 0
    };

    lineItem.variant = {
      _id: item.get('variantId'),
      uom: item.get('uom'),
      quantity: item.get('quantity')
    };
    lineItem.quantity += quantity;
    lineItem.price = item.get('price');
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
