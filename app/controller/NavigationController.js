/* 
* @Author: renjithks
* @Date:   2015-06-29 01:56:40
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:09
*/
Ext.define('Pyo.customer.controller.CageNavigationController', {
    extend: 'Ext.app.Controller',

    config: {
        defaultRoute: null,
        navBarConfig: null,     // Override point to configure nav bar items
        view: null,
        navView: null,
        presentedController: null,   // The controller this controller is presenting
        presentingController: null  // The controller presenting this controller
    },

    launch: function() {
    },

    setViewportActiveItem: function() {
        var navView = this.getNavView();
        if(navView === Ext.Viewport.getActiveItem()) {
            this.onPaintedNavView();
        }
        else {
            navView.getActiveItem().addListener('painted', this.onPaintedNavView, this, {
                single: true
            });
            Ext.Viewport.setActiveItem(navView);
        }
    },

    onPaintedNavView: function() {
        var proto = '__proto__'; // WHYYYY?!?!!? Cuz of lint and reserved words.
        var routeName = Ext.Object.getKeys(this.config.routes[proto])[0]; // TODO rework the routes config block
      //  Jda.Cage.PageContextManager.setWebViewToActiveController(routeName, undefined);
    },

    updateView: function(view) {
        // The root controller creates the nav view and adds it to the viewport.
        // Controllers that are being presented don't need to do this, they reside
        // within this root controller's nav view, which is already in the viewport.
        if (!this.getPresentingController()) {
            var navView = Ext.create('Jda.Cage.view.CageNavigationView', {
                items: [ view ]
            });
            this.setNavView(navView);
        }
    },

    // Method to push a controller onto the stack. Currently, we expect that this is a
    // just the class name of a controller, and its config. It is created internally.
    pushController: function(controllerName, controllerConfig) {
        // Prevent controllers from being pushed while already presenting a controller
        if (this.getPresentedController()) {
            return;
        }

        var application = this.getApplication(),
            config = Ext.applyIf({ application: application }, controllerConfig),
            controller = Ext.create(controllerName, config),
            route = this.getDefaultRoute() || this._getFirstRouteName();

        // Mark this controller as our presented 
        this.setPresentedController(controller);

        // Mark ourselves as the presenting controller and share the nav view
        controller.setPresentingController(this);
        controller.setNavView(this.getNavView());

        // Share the route, since they're on the same native controller ultimately
        controller.setDefaultRoute(route);

        // Initialize the controller, but don't launch it yet.
        controller.init(application);

        // Push the sub controller's view onto the navigation view
        this.getNavView().push(controller.getView());

        // Add it to the native view stack
        Jda.Cage.NavigationStackManager.pushController(route, Ext.bind(this.popController, this));

        // Allow the sub controller to configure it's nav bar
        controller.launch(application);
    },

    // Method to pop the top controller off the stack.
    popController: function() {
        // Prevent pop from getting called when this controller is the top controller. This
        // can occur when two pops occur rapidly, and the views aren't correctly removed.
        if (!this.getPresentedController()) {
            return;
        }

        this.getNavView().pop();

        this.getPresentedController().destroy();
        this.setPresentedController(null);
    },


    destroy: function() {
        this.callParent(arguments);

        this._removeControlHandlers();
    },

    _getFirstRouteName: function() {
        var routes = this.getRoutes(),
            routeNames = [];

        // Iterate over the object keys
        for (var routeName in routes) {
            routeNames.push(routeName);
        }

        return routeNames[0];
    },

    // Clean up handlers this controller manages via the 'control' config
    // This is mostly taken from the Ext.application.Application#control
    // method, but switches addListener with removeListener.
    _removeControlHandlers: function() {
        var selector, ref, eventName, listener, listeners,
            refs = this.getRefs(),
            selectors = this.getControl(),
            dispatcher = this.getEventDispatcher();

        for (selector in selectors) {
            if (selectors.hasOwnProperty(selector)) {
                listeners = selectors[selector];
                ref = refs[selector];

                //refs can be used in place of selectors
                if (ref) {
                    selector = ref.selector || ref;
                }

                for (eventName in listeners) {
                    listener = listeners[eventName];

                    if (Ext.isString(listener)) {
                        listener = this[listener];
                    }

                    dispatcher.removeListener('component', selector, eventName, listener, this);
                }
            }
        }
    },

    _parseButtonConfig: function(buttonsConfig) {
        Ext.Array.each(buttonsConfig, function(config) {
            config.callback = {
                fn: this._getCallbackFn(config.callback),
                scope: this
            };
        }, this);

        return buttonsConfig;
    },

    _getCallbackFn: function(fn) {
        var callbackFn = fn;

        if (typeof callbackFn === 'string') {
            callbackFn = this[callbackFn];
        }

        return callbackFn;
    }
});
