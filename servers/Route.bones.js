var path = require('path');

// Add all the client scripts.
// ---------------------------

// Prepare a mirror for the routers.
var options = {
    type: '.js',
    wrapper: Bones.utils.wrapClientFile,
    sort: Bones.utils.sortByLoadOrder
};
servers.Route.prototype.assets.pages = new mirror([], options);

// Add pages into all.js.
servers.Route.prototype.assets.all = new mirror([
    servers.Route.prototype.assets.all,
    // Page.js
    require.resolve('page'),
    // Client scripts.
    require.resolve(path.join(__dirname, '../client/page')),
    // Pages.
    // TODO: ability to include certain routers on a certain page.
    servers.Route.prototype.assets.pages
], {
    type: '.js'
});

// Augment.
servers.Route.augment({
    registerComponents: function(parent, app) {
        parent.call(this, app);

        // Register pages.
        _(app['pages'] || null).each(function(instance) {
            instance.register(this);
        }, this);
    }
});
