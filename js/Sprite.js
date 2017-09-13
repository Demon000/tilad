(function() {
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
    window.Sprite = Sprite;
    ResourceLoader.addGlobalType('sprite', Sprite);
})();
