/* 
 * @Author: renjithks
 * @Date:   2015-06-29 15:24:03
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-20 23:53:53
 */
Ext.define('Customer.view.CartView', {
  extend: 'Customer.view.Main',
  alias: 'widget.cart-view',
  requires: [
    // 'Ext.TitleBar',
    // 'Ext.dataview.component.DataItem'
  ],
  config: {
    id: 'cart-view',
    barTitle: 'Cart',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'panel',
      itemId: 'no-data',
      html: 'No items in cart',
      height: '100%',
      hidden: true
    }, {
      xtype: 'panel',
      itemId: 'cartHeader',
      cls: 'cart-header',
      flex: 2,
      padding: 10
    }, {
      xtype: 'dataview',
      itemId: 'list',
      cls: ['dataview-list'],
      defaultType: 'cartitem',
      useComponents: true,
      flex: 8,
      //height: '100%',
      width: '100%'
    }, {
      xtype: 'button',
      dicked: 'bottom',
      itemId: 'checkout-button',
      text: 'Checkout',
      flex: 1,
      width: '100%',
      docked: 'bottom',
      disabled: true
    }]
  },

  initialize: function() {
    this.callParent();
    //this.down("#cartHeader").setTpl(tpl);
  },

  updateData: function(data) {
    this.callParent(arguments);
    if (!data || !data.get || !data.get('lineItems') || !data.get('lineItems').length) {
      this.down('#no-data').setHidden(false);
      return;
    }
    this.down('#no-data').setHidden(true);
    this.down('#checkout-button').setDisabled(false);
    this.remove(this.down('#list'));
    this.add({
      xtype: 'dataview',
      itemId: 'list',
      cls: ['dataview-list'],
      defaultType: 'cartitem',
      useComponents: true,
      flex: 8,
      //height: '100%',
      width: '100%'
    });
    this.down('#list').setData(data.get('lineItems'));
    this.down('#list').getStore().load();
    this.down('#cartHeader').setData(data.getData());
  },

  _onOrderTypeChange: function(type) {

  }
});

Ext.define('CartInnerItem', {
  extend: 'Ext.Panel',
  xtype: 'cartinneritem',

  config: {
    itemId: 'cartinneritem',
    flex: 2,
    /**
     * Object with product's data
     */
    defaults: {
      padding: '5px 10',
    },
    layout: 'vbox',
    items: [{
      xtype: 'label',
      itemId: 'displayname'
    }, {
      //xtype: panel,
      layout: {
        type: 'hbox',
        align: 'center'
      },
      items: [{
        xtype: 'label',
        flex: 1,
        itemId: 'variant',
        cls: 'cart-items-details'
      }, {
        xtype: 'label',
        flex: 1,
        itemId: 'price',
        cls: 'cart-items-details'
      }, {
        flex: 2,
        xtype: "spinnerfield",
        stepValue: 1, // From 2.1 Beta
        minValue: 1,
        maxValue: 10,
        itemId: "itemspinnerfield",
        groupButtons: false,
        component: {
          disabled: false
        }
      }, {
        xtype: 'label',
        itemId: "subtotal",
        styleHtmlCls: 'subtotal-cls',
        flex: 1,
        cls: 'cart-items-details'
      }]
    }]
  },

  setDisplayName: function(name) {
    this.down("#displayname").setHtml(name);
  },
  setPrice: function(price) {
    this.down("#price").setHtml('Rs ' + price);
  },
  setSubtotal: function(subtotal) {
    this.down("#subtotal").setHtml('Rs ' + subtotal);
  },
  setQuantity: function(count) {
    this.down("#itemspinnerfield").setValue(count);
  },
  setVariant: function(variant) {
    this.down('#variant').setHtml(variant.quantity + ' ' + variant.uom);
  }
});

// Main Cart Item
Ext.define('CartItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'cartitem',

  config: {
    itemId: 'cartitem',
    storeId: null,
    layout: 'fit',
    cls: 'cartitem-cls',

    dataMap: {
      // Map product's data to dataItem setter
      getCartinneritem: {
        setDisplayName: 'name',
        setPrice: 'price',
        setSubtotal: 'total_price',
        setQuantity: 'quantity',
        setVariant: 'variant'
      }
    },
    cartinneritem: {
      flex: 2
    },
    deleteButton: {
      iconCls: 'trash',
      iconMask: true,
      ui: 'plain',
      itemId: "itemdelete"
    },

    layout: {
      type: 'hbox',
      align: 'center'
    }
  },

  applyCartinneritem: function(config) {
    return Ext.factory(config,
      CartInnerItem,
      this.getCartinneritem());
  },

  updateCartinneritem: function(newItemLine, oldItemLine) {
    if (oldItemLine) {
      this.remove(oldItemLine);
    }

    if (newItemLine) {
      newItemLine.down("#itemspinnerfield").on('change', this.updateQuantity, this);
      // Attach lines to DataView
      this.add(newItemLine);
    }
  },

  updateQuantity: function(spinField, newValue, oldValue, eOpts) {
    var record = this.getRecord(),
      me = this,
      subtotal;
    record.set("quantity", newValue);
    subtotal = (record.get("quantity") * record.get("price")).toFixed(2);
    record.set("total_price", subtotal);
    spinField.fireEvent('quantityspin', record, spinField, newValue, this);
    var cart = Ext.getStore('cartStore').getCartForStore(record.get('store_id'));
    cart.set('total_price', null);
    if (this.up('#cart-view'))
      this.up('#cart-view').down('#cartHeader').setData(cart.getData());
  },

  applyDeleteButton: function(config) {
    return Ext.factory(config, Ext.Button, this.getDeleteButton());
  },

  updateDeleteButton: function(newDeleteButton, oldDelteButton) {
    if (oldDelteButton) {
      this.remove(oldDelteButton);
    }

    if (newDeleteButton) {
      // add an event listeners for the `tap` event onto the new button, and tell it to call the onNameButtonTap method
      // when it happens
      newDeleteButton.on('tap', this.onDeleteButtonTap, this);

      this.add(newDeleteButton);
    }
  },

  onDeleteButtonTap: function(button, e) {
    var record = this.getRecord(),
      me = this;
    var store = me.getDataview().getStore();
    store.remove(record);
    button.fireEvent('deleteitem', this);
    var cart = Ext.getStore('cartStore').getCartForStore(record.get('store_id'));
    var index = -1;
    cart.get('lineItems').forEach(function(item, i) {
      if (item.variant._id === record.get('variant')._id) {
        index = i;
      }
    });
    if (index > -1) {
      cart.get('lineItems').splice(index, 1);
    }
    cart.set('total_price', null);
    var cartView = Ext.getCmp('cart-view');
    cartView.down('#no-data').setHidden(!!store.getCount());
    cartView.down('#cartHeader').setData(cart.getData());
    cartView.down('#checkout-button').setDisabled(!cart.get('lineItems').length);

    // Ext.Msg.confirm(null, "Do you want to remove?", function(answer) {
    //   console.log('Hi');
    //   if (answer === 'yes') {
    //     me.getDataview().getStore().remove(record);
    //     button.fireEvent('deleteitem', this);
    //   }
    // });
  }
});
