var path = require('path');

var Bones = require('bones');
var utils = Bones.utils;
var _ = Bones._;

// Add the ability to load pages.
// ------------------------------
// Add a custom extension "page.js".
require.extensions['.page.js'] = function(module, filename) {
    // Export nothing; it's client only.
    module.exports = {};
    // Add pages to assets.
    module.exports.register = function(server) {
        this.files.forEach(function(filename) {
            if (server.assets && server.assets.pages.indexOf(filename) < 0) {
                server.assets.pages.push(filename);
            }
        });
    };
    Bones.plugin.add(module.exports, filename);
};
// @see "bones/server/plugin.js".
var _requirejs = require.extensions['.js'];
require.extensions['.js'] = function(module, filename) {
    if (/^.+\.page\.js$/.test(filename)) {
        return require.extensions['.page.js'](module, filename);
    }
    return _requirejs(module, filename);
};

// Load me.
Bones.load(__dirname);
