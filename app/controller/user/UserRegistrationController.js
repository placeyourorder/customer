/* 
 * @Author: renjithks
 * @Date:   2015-08-05 21:25:11
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-03 01:49:30
 */

'use strict';

Ext.define('Customer.controller.user.UserRegistrationController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'users/register': '_register'
    },
    refs: {
      userRegistrationView: '#user-registration',
      registerButton: '#user-registration #register',
      userLoginButton: '#user-registration #userLogin',
    },
    control: {
      registerButton: {
        tap: '_onRegisterButtonClick'
      }
    }
  },

  _register: function() {
    var me = this;
    var view = this.getUserRegistrationView();
    if(!view) {
      view = Ext.create('Customer.view.user.UserRegistrationView');
      this.getUserLoginButton().element.on({
      tap: function(e, t) {
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        me.redirectTo('users/login');
      }
    });
    }

    Ext.Viewport.add(view);
  },

  _onRegisterButtonClick: function(button, e, eOpts) {
    var form = button.up('formpanel');
    var user = Ext.create('Customer.model.UserRegistrationModel', form.getValues());
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
      url: Customer.util.Constants.SERVER_URL + '/users/register',
      method: 'POST',
      jsonData: {
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
    Ext.create('Ext.ux.Toast', {
      message: 'Registration success!',
      toastDuration: 'SHORT'
    });
  },

  _onRegistrationFailure: function(conn, response, options, eOpts) {
    Ext.Msg.alert('Failed');
  }
});