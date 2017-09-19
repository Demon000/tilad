# tilad
A tile-based adventure game ... or at least the start for one.

## Code has not been tested, might not even run.


## js/ResourceLoader.js

### Sprite

Constructs a `Sprite`.


#### Sprite.load(cb)

Loads the content of the sprite and calls `cb` when done.


#### Sprite.get(op)

Returns an Image object containing the sprite.

`op` can include options for how to return the result.


### Sprite.loaded

Bool that describes if the Sprite is loaded.


### Sprite.content

Image object containing the sprite.



## js/ResourceLoader.js


### ResourceLoader.prototype.addGlobalType(name, fn)

Adds a global resource type that will be available in any ResourceLoader constructed afterwards.

`name` is the name of the resource type.

`fn` is the constructor for that type.


### ResourceLoader.prototype.addGlobalTypeMultiple(types)

Adds multiple global resource types that will be available in any ResourceLoader constructed afterwards.

`types` must be an object of key-value pairs, where the key is the `name` of the resource type and value is the constructor for that resource.


### ResourceLoader(options)

Constructs a `ResourceLoader`.

`options` can be an object.

`options.types` can be an object of key-value pairs, where the key is the `name` of the resource type and value is the constructor for that resource.

`options.resources` can be an array of objects, each object must contain a `name` property which is the name of the resource that will be used to retrieve it later and a `type` property which is the type of resource.

Each object can also contain other properties that will be passed to the resource constructor.


#### ResourceLoader.add(name, type, op)

Adds a new resource with name `name` and type `type`.

`op` will be passed to the resource constructor.


#### ResourceLoader.addMultiple(resources)

Adds multiple resources.

`resources` must be an array of objects, each object must contain a `type` property which is the type of resource and a `name` property which is the name of the resource that will be used to retrieve it later.

Each object can also contain other properties that will be passed to the resource constructor.


#### ResourceLoader.get(name, op)

Returns the content of the resource with name `name`.

`op` can include options for how to return the result.


#### ResourceLoader.getReference(name)

Returns the resource with name `name`.


#### ResourceLoader.addType(name, fn)

Adds a resource type.

`name` is the name of the resource type.

`fn` is the constructor for that type.


#### ResourceLoader.addTypeMultiple(types)

Adds multiple resource types.

`types` must be an object of key-value pairs, where the key is the `name` of the resource type and value is the constructor for that resource.


#### ResourceLoader.load(name, cb)

Loads the resource with name `name` and calls `cb` afterwards.


#### ResourceLoader.loadAllSync(cb)

Helper for ResourceLoader.loadAll(), loads all the resources in order.


#### ResourceLoader.loadAllAsync(cb)

Helper for ResourceLoader.loadAll(), loads all the resources at the same time.


#### ResourceLoader.loadAll(cb, sync)

Loads all of the resources and calls `cb` when all the resources are loaded.

`sync` can be true to load all the resources in order.
