const resourceLoader = new ResourceLoader({
    types: {
        Sprite,
    },
    resources: [{
        type: 'Sprite',
        name: 'grass',
        src: 'assets/images/grass.png'
    }]
});
resourceLoader.loadResources(function(resources) {
    document.body.appendChild(resources.grass.get());
});
