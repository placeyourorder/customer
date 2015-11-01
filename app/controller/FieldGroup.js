/* 
 * @Author: renjithks
 * @Date:   2015-09-04 14:12:34
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-04 23:38:05
 */

'use strict';

Ext.define('Customer.controller.FieldGroup', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'fieldgroup': '_showView',
    },
  },

  _showView: function() {
    var view = Ext.create('Customer.view.fgtest');

    Ext.define("Load", {
      extend: "Ext.data.Model",
      config: {
        fields: [{
          name: "header",
          type: "string"
        }, {
          name: "items",
          type: "array"
        }]
      }
    });


    var store = Ext.create("Ext.data.Store", {
      model: "Load",
      data: [{
        "header": "Overview",
        "items": [{
          "cellStyle": "multiline_style",
          "values": {
            "text": "Load ID",
            "details": "68782"
          }
        }, {
          "cellStyle": "INTRAN_LDCONFED_LDCONFING_TNDACC",
          "values": {
            "text": "Status",
            "details": "Tender Accepted",
            "detailTextLabel.color": "0x006400"
          }
        }, {
          "values": {
            "text": "Route Map"
          },
          "links": [{
            "rel": "details",
            "href": "mec://map?title=Route%20Map&url=RouteMap/1.0?LoadID%3d68782"
          }]
        }]
      }, {
        "collapsible": "true",
        "collapsable": 1,
        "collapsed": 0,
        "header": "Scheduling",
        "items": [{
          "values": {
            "text": "Schedule"
          },
          "links": [{
            "rel": "details",
            "href": "mec://list?title=Schedule&url=LoadSchedule/1.0?LoadID%3d68782"
          }]
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Ship Date",
            "details": "1/23/13 3:00AM"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Delivery Date",
            "details": "2/11/13 8:00AM"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Origin",
            "details": "SHANGHAI CHINA"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Destination",
            "details": "SAVANNAH GA USA"
          }
        }]
      }, {
        "collapsible": "true",
        "collapsable": 1,
        "collapsed": 0,
        "header": "Load Details",
        "items": [{
          "cellStyle": "multiline_style",
          "values": {
            "text": "Carrier Code",
            "details": "BR3_KKLU"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Service",
            "details": "SHA-LGB"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Equipment",
            "details": "L20"
          }
        }, {
          "values": {
            "text": "Distance",
            "details": "7853 MI"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Total Freight Charge",
            "details": "1,200.00 USD"
          },
          "links": [{
            "rel": "details",
            "href": "mec://list?title=Rating%20Results&url=LoadRates/1.0?LoadID%3d68782"
          }]
        }, {
          "values": {
            "text": "Pickups",
            "details": "1"
          }
        }, {
          "values": {
            "text": "Deliveries",
            "details": "1"
          }
        }]
      }, {
        "collapsible": "true",
        "collapsable": 1,
        "collapsed": 0,
        "header": "Contents",
        "items": [{
          "cellStyle": "multiline_style",
          "values": {
            "text": "Weight",
            "details": "30,000 LB (66.67%)"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Volume",
            "details": "0 CU. FT"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Pallets",
            "details": "1"
          }
        }, {
          "cellStyle": "multiline_style",
          "values": {
            "text": "Pieces",
            "details": "0"
          }
        }]
      }]
    });
    console.log(store);
    view.down('#ftest').setStore(store);
    Ext.Viewport.setActiveItem(view);
  }
});