/*
 * @Author: renjithks
 * @Date:   2015-09-06 17:00:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-06 23:02:00
 */

Ext.define('Customer.view.cart.CartListView', {
  extend: 'Customer.view.Main',
  alias: 'widget.cart-list-view',

  config: {
    id: 'cart-list-view',
    barTitle: 'Carts',
    layout: {
      type: 'fit'
    },
    items: [{
      xtype: 'dataview',
      itemId: 'list',
      cls: ['dataview-list'],
      defaultType: 'cartList',
      useComponents: true,
      //height: '100%',
      width: '100%'
    }]
  },

  initialize: function() {
    this.callParent();
    //this.down('#list').on('itemtap', this.cartItemClick, this);
  },

  updateData: function(data) {
    this.callParent(arguments);
    if (!data)
      return;
    this.down('#list').setStore(data);
    this.down('#list').refresh();
    this.down('#list').on('itemtap', this.cartItemClick, this);
  },

  cartItemClick: function(item, index, target, record, e, eOpts) {
    console.log(index);
    console.log(this.fireEvent('cartclick', record));
  }
});

Ext.define('CartListInnerItem', {
  extend: 'Ext.Panel',
  xtype: 'cartListInnerItem',

  config: {
    itemId: 'cartListInnerItem',
    /**
     * Object with product's data
     */
    defaults: {
      padding: '5px 10',
    },
    layout: 'hbox',
    items: [{
      xtype: 'label',
      itemId: 'storename'
    }, {
      xtype: 'label',
      itemId: 'createddate'
    }, {
      xtype: 'label',
      itemId: 'totalprice'
    }]
  },

  setStoreName: function(name) {
    this.down("#storename").setHtml(name.title);
  },
  setTotalPrice: function(price) {
    this.down("#totalprice").setHtml('Rs ' + price);
  },
  setCreatedDate: function(date) {
    this.down("#createddate").setHtml('Rs ' + date);
  }
});

Ext.define('CartListItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'cartList',

  config: {
    itemId: 'cartList',
    storeId: null,
    layout: 'fit',
    height: 44,
    cls: 'cartlist-cls',

    dataMap: {
      // Map product's data to dataItem setter
      getCartListInnerItem: {
        setStoreName: 'store_details',
        setTotalPrice: 'total_price',
        setCreatedDate: 'created_date'
      }
    },

    cartListInnerItem: {
      flex: 1
    },

    layout: {
      type: 'hbox'
    }
  },

  applyCartListInnerItem: function(config) {
    return Ext.factory(config,
      CartListInnerItem,
      this.getCartListInnerItem());
  },

  updateCartListInnerItem: function(newItemLine, oldItemLine) {
    if (oldItemLine) {
      this.remove(oldItemLine);
    }

    if (newItemLine) {
      this.add(newItemLine);
    }
  }
});