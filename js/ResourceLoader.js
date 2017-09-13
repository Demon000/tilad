(function(){
    function Sprite(op) {
        var s = this;
        
        s.loaded = false;
        
        s.content = new Image();
        
        s.load = function(cb) {
            s.content.onload = function() {
                s.loaded = true;
                cb(s);
            };
            s.content.src = op.src;
        };

        s.get = function(op) {
            return s.content;
        };
    }

    function ResourceLoader(op) {
        var rl = this;
        rl.types = {
            'sprite': Sprite,
        };

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

        if (op.resources) {
            rl.addMultiple(op.resources);
        }
    }

    window.Sprite = Sprite;
    window.ResourceLoader = ResourceLoader;
})();
