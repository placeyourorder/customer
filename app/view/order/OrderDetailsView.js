/*
 * @Author: renjithks
 * @Date:   2015-08-26 00:17:14
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-26 02:27:59
 */


Ext.define('Pyo.customer.view.order.OrderDetailsView', {
  extend: 'Pyo.customer.view.Main',
  alias: 'widget.orderdetails-view',
  requires: [
    'Ext.dataview.component.DataItem'
  ],
  config: {
    id: 'orderdetails-view',
    barTitle: 'Order',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'panel',
      itemId: 'orderHeader',
      cls: 'order-header',
      flex: 2,
      padding: 10
    }, {
      xtype: 'dataview',
      itemId: 'list',
      cls: ['dataview-list'],
      defaultType: 'lineitem',
      useComponents: true,
      flex: 8,
      //height: '100%',
      width: '100%'
    }, {
      xtype: 'button',
      dicked: 'bottom',
      itemId: 'change-button',
      text: 'Change',
      flex: 1,
      width: '100%',
      disabled: true
    }]
  },

  initialize: function() {
    this.callParent();
    var tpl = new Ext.XTemplate(
      '<div>',
      '<div class="cart-header store-section">',
      '<div>',
      '<div class="cart-header store-name">{store_details.title}</div>',
      '<div class="cart-header cart-section">',
      '<div>Ships to current location</div>',
      '<div class="cart-header cart-total">Total: Rs {total_price}</div>',
      '</div>',
      '</div>', {
        getAddress: function(addr1, addr2, addr3) {
          return addr1 + ', ' + addr2 + ', ' + addr3;
        }
      }
    );
    this.down("#orderHeader").setTpl(tpl);
  },

  updateData: function(data) {
    this.callParent(arguments);
    if (!data)
      return;
    console.log(data);
    this.down('#list').setData(data.data.line_items);
    this.down('#orderHeader').setData(data.data);
  }
});

Ext.define('OrderInnerItem', {
  extend: 'Ext.Panel',
  xtype: 'orderinneritem',

  config: {
    itemId: 'orderinneritem',
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
        xtype: 'label',
        flex: 1,
        itemId: 'quantity',
        cls: 'cart-items-details'
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
    this.down("#quantity").setHtml('Qty ' + count);
  },
  setVariant: function(variant) {
    this.down('#variant').setHtml(variant.quantity + ' ' + variant.uom);
  }
});

// Main Cart Item
Ext.define('LineItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'lineitem',

  config: {
    itemId: 'lineitem',
    storeId: null,
    layout: 'fit',
    cls: 'lineitem-cls',

    dataMap: {
      // Map product's data to dataItem setter
      getOrderinneritem: {
        setDisplayName: 'name',
        setPrice: 'price',
        setSubtotal: 'total_price',
        setQuantity: 'quantity',
        setVariant: 'variant'
      }
    },
    orderinneritem: {
      flex: 1
    },

    layout: {
      type: 'hbox',
      align: 'center'
    }
  },

  applyOrderinneritem: function(config) {
    return Ext.factory(config,
      OrderInnerItem,
      this.getOrderinneritem());
  },

  updateOrderinneritem: function(newItemLine, oldItemLine) {
    if (oldItemLine) {

      this.remove(oldItemLine);
    }

    if (newItemLine) {
      // Attach lines to DataView
      this.add(newItemLine);
    }
  }
});