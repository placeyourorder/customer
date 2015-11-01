/* 
 * @Author: renjithks
 * @Date:   2015-09-04 14:12:23
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-06 00:12:53
 */


Ext.define('Customer.view.FieldGroup', {
  extend: 'Ext.Container',
  xtype: 'fieldgroup',
  alternateClassName: 'Customer.view.FieldGroup',

  requires: [
    'Ext.form.FieldSet'
  ],

  config: {

    id: 'fieldgroup',

    scrollable: {
      direction: 'vertical',
      directionLock: true
    },

    height: '100%',

    /**
     * @cfg {String/String[]} cls
     * The CSS class to add to this component's feild group.
     */
    groupItemcls: 'fieldgroup',

    /**
     * @cfg {String/String[]} cls
     * The CSS class to add to this component's element.
     */
    cls: Ext.baseCSSPrefix + 'fieldgroup-list',

    /**
     * @cfg {String/Object} layout
     * Default layout config.
     */
    layout: {
      type: 'fit'
    },

    /**
     * @cfg {Ext.data.Store/Object/String} store
     * Store instance
     */
    store: null,

    /**
     * @cfg {String} contentItemTpl
     * Content item's html template.
     */
    contentItemTpl: new Ext.XTemplate(
      '<div class="', Ext.baseCSSPrefix, 'fieldgroup-list-item">',
      '<div class="', Ext.baseCSSPrefix, 'fieldgroup-list-item-label">{text}</div>',
      '<tpl if="href">',
      '<div class="', Ext.baseCSSPrefix, 'fieldgroup-list-item-href"></div>',
      '</tpl>',
      '<tpl if="details">',
      '<div class="', Ext.baseCSSPrefix, 'fieldgroup-list-item-value">{details}</div>',
      '</tpl>',
      '</div>'
    ),

    /**
     * @private
     */
    fieldGroups: []
  },
  /**
   * @protected
   */
  initialize: function() {
    var me = this;
    me.callParent(arguments);
  },

  /**
   * @protected
   */
  applyStore: function(newStore) {
    if (newStore) {
      if (Ext.isString(newStore)) {
        // store id
        newStore = Ext.data.StoreManager.get(newStore);
      } else {
        // store instance or store config
        if (!(newStore instanceof Ext.data.TreeStore)) {
          newStore = Ext.factory(newStore, Ext.data.Store, null);
        }
      }
    }

    if (!newStore.isStore) {
      console.error('You should set a store id, a store config or an instance of Ext.data.Store to `store` config');
      return;
    }
    return newStore;
  },

  /**
   * @protected
   */
  applyDisplayField: function(newField) {
    return '{' + newField + '}';
  },

  /**
   * @protected
   */
  updateStore: function(newStore) {
    var me = this,
      groups = me.getFieldGroups();

    if (!groups.length) {
      groups = me.readyFieldGroups(newStore);
    }

    //list.setStore(newStore);
  },

  /**
   * @protected
   */
  readyFieldGroups: function(newStore) {
    var me = this,
      config,
      label,
      group;
    newStore.each(function(item) {
      //config = me.makeFieldGroupConfig(item);
      group = Ext.create('Ext.form.FieldSet');
      group.setTitle(item.get('header'));
      group.addCls(me.getGroupItemcls());
      if (item.get('items')) {
        var items = item.get('items');
        for (var i = 0; i < items.length; i++) {
          var tmpl = me.getContentItemTpl();
          label = Ext.create('Ext.Label');
          var href = items[i].links ? items[i].links[0].href : null;
          var text = items[i].values ? items[i].values.text : null;
          var details = items[i].values ? items[i].values.details : null;
          var data = {
            href: href,
            text: text,
            details: details
          };
          label.setTpl(tmpl);
          label.setData(data);
          group.add(label)
        }
      }
      me.getFieldGroups().push(group);
      me.add(group);
    });

    return me.getFieldGroups();
  }
});