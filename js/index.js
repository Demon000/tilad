var resourceLoader = new ResourceLoader({
    resources: [{
        name: 'grass',
        type: 'sprite',
        src: 'assets/images/grass.png'
    }]
});
resourceLoader.loadAll(function(resources) {
    console.log('loaded', resources);
    document.body.appendChild(resources.grass.get());
});
