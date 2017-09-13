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

        rl.load = function(name, cb) {
            rl.resources[name].load(cb);
        };

        rl.loadAllSync = function(cb) {
            var i = 0;
            var s = function() {
                rl.resources[i].load(function() {
                    if(i == rl.resources.length) {
                        cb(rl.resources);
                    } else {
                        i++;
                        s();
                    }
                });
            };
            s();
        };

        rl.loadAllAsync = function(cb) {
            rl.resources.forEach(function(r) {
                r.load(function() {
                    var all = true;
                    rl.resources.forEach(function(r) {
                        if(!r.loaded) {
                            all = false;
                        }
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
                rl.addTypeMultiple(op.types);
            }

            if (options.resources) {
                rl.addMultiple(op.resources);
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
