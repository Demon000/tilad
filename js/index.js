const resourceManager = new ResourceManager({
    types: {
        Sprite,
    },
    resources: [{
        type: 'Sprite',
        name: 'grass',
        src: 'assets/images/grass.png'
    }]
});
resourceManager.loadResources(function(resources) {
    document.body.appendChild(resources.grass.get());
});
