(function(){
    function Sprite(op) {
        var s = this;
        
        s.loaded = false;
        
        s.content = new Image();
        
        s.load = function(cb) {
            s.content.onload = function() {
                s.loaded = true;
                cb();
            };
            s.content.src = op.src;
        };
        s.get = function(op) {
            return s.content;
        };
        
    }

    function ResourceLoader() {
        var rl = this;
        rl.types = {
            'sprite': Sprite,
        };
        rl.resources = {};
        
        rl.setType = function(name, fn) {
            rl.types[name] = fn; 
        } ;
        rl.add = function(name, type, op) {
            rl.resources[name] = new rl.types[type](op);
        };
        rl.get = function(name, op, cb) {
            rl.resources[name].get(op, cb);
        }
    }
    window.ResourceLoader = ResourceLoader;
})();