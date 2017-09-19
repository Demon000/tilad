(function(){
    var globalTypes = {};

    function ResourceLoader(options) {
        var rl = this;
        rl.types = {};
        rl.resources = {};

        rl.addType = function(name, fn) {
            rl.types[name] = fn;
        };

        rl.addTypeMultiple = function(types) {
            for (var name in types) {
                rl.addType(name, types[name]);
            }
        };

        rl.add = function(name, type, op) {
            rl.resources[name] = new rl.types[type](op);
        };

        rl.addMultiple = function(resources) {
            resources.forEach(function(r) {
                rl.add(r.name, r.type, r);
            });
        };

        rl.get = function(name, op) {
            return rl.resources[name].get(op);
        };

        rl.getReference = function(name) {
            return rl.resources[name];
        };

        rl.load = function(name, cb) {
            rl.resources[name].load(cb);
        };

        rl.loadAllSync = function(cb) {
            var i = 0;
            var keys = Object.keys(rl.resources);
            function loadNext() {
                if(i == keys.length) {
                    cb(rl.resources);
                } else {
                    rl.resources[keys[i]].load(function() {
                        i++;
                        loadNext();
                    });
                }
            }
            loadNext();
        };

        rl.loadAllAsync = function(cb) {
            var keys = Object.keys(rl.resources);
            keys.forEach(function(k) {
                rl.resources[k].load(function() {
                    var all = keys.every(function(k) {
                        return rl.resources[k].loaded;
                    });
                    if(all) {
                        cb(rl.resources);
                    }
                });
            });
        };

        rl.loadAll = function(cb, sync) {
            if(sync) {
                rl.loadAllSync(cb);
            } else {
                rl.loadAllAsync(cb);
            }
        };

        rl.addTypeMultiple(globalTypes);

        if (options) {
            if (options.types) {
                rl.addTypeMultiple(options.types);
            }

            if (options.resources) {
                rl.addMultiple(options.resources);
            }
        }
    }

    ResourceLoader.prototype.addGlobalType = function(name, fn) {
        globalTypes[name] = fn;
    };
    ResourceLoader.prototype.addGlobalTypeMultiple = function(types) {
        for (var name in types) {
            ResourceLoader.prototype.addGlobalType(name, types[name]);
        }
    };

    window.ResourceLoader = ResourceLoader;
})();
