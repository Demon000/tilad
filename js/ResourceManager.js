class ResourceManager {
    constructor(options = {}) {
        this.types = {};
        this.resources = {};

        if (options.types) {
            this.addTypes(options.types);
        }

        if (options.resources) {
            this.addResources(options.resources);
        }
    }

    /**
     * Add a resource type.
     * 
     * @param name The name of the resource type.
     * @param cl The class to use when constructing such a resource.
     */
    addType(name, cl) {
        this.types[name] = cl;
    }

    /**
     * Add multiple resource types.
     * 
     * @param types An object where the key is the name of the resource type
     *  and the value is the class to use when constructing such a resource.
     */
    addTypes(types) {
        for (let name in types) {
            this.addType(name, types[name]);
        }
    }

    /**
     * Add a resource.
     * 
     * @param name The name of the resource.
     * @param type The type of the resource, previously registered using addType(s).
     * @param options An object to pass to the resource type constructor.
     */
    addResource(name, type, options) {
        this.resources[name] = new this.types[type](options);
    }

    /**
     * Add multiple resources.
     * 
     * @param resources An array where each item is an object of the form
     *  { name, type, ...options }.
     */
    addResources(resources) {
        resources.forEach(function(resource) {
            const { name, type, ...options } = resource;
            this.addResource(name, type, options);
        });
    }

    /**
     * Get a resource.
     * 
     * @param name The name the resource to retrieve.
     * @param options Options to pass to the get method of the resource.
     * 
     * @return The requested resource.
     */
    getResource(name, options) {
        return this.resources[name];
    }

    /**
     * Get whether all the resources have been loaded.
     * 
     * @return Whether all the resources have been loaded or not.
     */
    areResourcesLoaded() {
        const names = Object.keys(this.resources);

        return names.every(name => {
            return this.resources[name].loaded;
        });
    }

    /**
     * Load a resource.
     * 
     * @param name The name of the resource to load.
     * @param cb A function to be called after the resource has been loaded.
     */
    loadResource(name, cb) {
        this.getResource(name).load(cb);
    }

    /**
     * Load all the resources.
     * 
     * @param cb A function to be called after all the resources have been loaded.
     */
    loadResources(cb) {
        const names = Object.keys(this.resources);

        names.forEach(name => {
            const resource = this.getResource(name);
            resource.load(() => {
                if (this.areResourcesLoaded()) {
                    cb(this.resources);
                }
            });
        });
    }
}
