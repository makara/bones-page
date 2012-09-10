(function() {

    // Bones.Page
    // ----------
    var Page = Bones.Page = function(options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };

    _.extend(Page.prototype, Backbone.Events, {

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function() {},

        // Just a shortcut.
        page: function() {
            if (!window.page) return;
            window.page.apply(this, arguments);
        },

        // Bind all defined routes.
        _bindRoutes: function() {
            _(this.routes || null).each(function(name, route) {
                // TODO: if (_.isArray(name))
                if (this[name]) {
                    this.page(route, _.bind(this[name], this));
                }
            }, this);
        }
    });

    Page.augment = Backbone.Router.augment;
    Page.extend = Backbone.Router.extend;

    // TODO: better to have another function instead of wrapping
    // "Bones.start()"?
    Bones.start = _(Bones.start).wrap(function(parent, options) {
        // Bones.start() always start this.
        Backbone.history || (Backbone.history = new Backbone.History());

        parent.call(this, options);

        // Start routing.
        page(options);
    });

}).call(this);
