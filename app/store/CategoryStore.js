/*
 * @Author: renjithks
 * @Date:   2015-07-14 01:47:21
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-11 17:10:34
 */

'use strict';

var categoryData = {
  "items": [{
    "text": "Fresh Produce",
    "items": [{
      "text": "Fresh Vegetables",
      "leaf": true
    }, {
      "text": "Salads & Herbs",
      "leaf": true
    }, {
      "text": "Fresh Fruits",
      "leaf": true
    }, {
      "text": "Organics",
      "leaf": true
    }]
  }, {
    "text": "Dairy & Chilled",
    "items": [{
      "text": "Chilled Deserts",
      "leaf": true
    }, {
      "text": "Cheese",
      "leaf": true
    }, {
      "text": "Milk, Butter, Eggs",
      "leaf": true
    }, {
      "text": "Yoghurt",
      "leaf": true
    }],
  }, {
    "text": "Bakery",
    "items": [{
      "text": "Cakes",
      "leaf": true
    }]
  },{
    "text": "Boutiques",
    "items": [{
      "text": "Men",
      "leaf": true
    },
    {
      "text": "Women",
      "leaf": true
    }]
  }, {
    "text": "Beverages",
    "items": [{
      "text": "Coffe",
      "leaf": true
    }, {
      "text": "Juice Drinks",
      "leaf": true
    }, {
      "text": "Soft Drinks",
      "leaf": true
    }, {
      "text": "Water",
      "leaf": true
    }]
  }]
};

Ext.define('Customer.store.CategoryStore', {
  extend: 'Ext.data.TreeStore',
  config: {
    model: 'Customer.model.CategoryModel',
    defaultRootProperty: 'items',
    root: categoryData
  }
});
