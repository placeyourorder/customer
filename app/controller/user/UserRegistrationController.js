/* 
 * @Author: renjithks
 * @Date:   2015-08-05 21:25:11
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-16 15:31:37
 */

'use strict';

Ext.define('Pyo.customer.controller.user.UserRegistrationController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'users/register': '_register'
    },
    refs: {
      userRegistrationView: '#user-registration',
      registerButton: '#user-registration #register'
    },
    control: {
      registerButton: {
        tap: '_onRegisterButtonClick'
      }
    }
  },

  _register: function() {
    var view = this.getUserRegistrationView();
    if(!view) {
      view = Ext.create('Pyo.customer.view.user.UserRegistrationView');
    }
    Ext.Viewport.add(view);
  },

  _onRegisterButtonClick: function(button, e, eOpts) {
    var form = button.up('formpanel');
    var user = Ext.create('Pyo.customer.model.UserRegistrationModel', form.getValues());
    console.log(user);
    var errors = user.validate();
    if (!errors.isValid()) {
      var errorMsg = "";
      errors.each(function(item, index, length) {
        console.log(item.getField());
        form.down("field[name='" + item.getField() + "']").addCls('invalidField');
        errorMsg += ' ' + item.getField() + ' ' + item.getMessage() + '<br/>';
      });
      Ext.Msg.alert("Validation Failed", errorMsg);
    } else {
      this._createUser(user);
    }
  },

  _createUser: function(user) {
    Ext.Ajax.request({
      url: Pyo.customer.util.Constants.SERVER_URL + '/users/register',
      method: 'POST',
      params: {
        email: user.get('Email'),
        password: user.get('Password'),
        phone: user.get('Phone'),
        type: 'CUSTOMER'
      },
      scope: this,
      success: this._onRegistrationSuccess,
      failure: this._onRegistrationFailure
    });
  },

  _onRegistrationSuccess: function() {
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    this.redirectTo('users/login');
  },

  _onRegistrationFailure: function() {
    Ext.Msg.alert('Failed');
  }
});