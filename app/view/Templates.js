/* 
 * @Author: renjithks
 * @Date:   2015-10-14 01:30:31
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-16 02:10:33
 */

'use strict';

Ext.define('Customer.view.Templates', {
  singleton: true,
  getItemGridTpl: function() {
    if (!this.itemGridTpl) {
      this.itemGridTpl = new Ext.XTemplate(
        '<div class="item-grid-inner">',
        '<img class="item-grid-img" src="{images.small}"/>',
        '<div class="item-grid-name fade">{name}</div>',
        '<div class="item-grid-uom">{quantity} {uom}</div>',
        '<span class="rupeeCls"></span>',
        '<span class="item-grid-price">{price}</span>',
        '</div>'
      );
    }
    return this.itemGridTpl;
  }
});
