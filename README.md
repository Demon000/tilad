# tilad
A tile-based adventure game ... or at least the start for one.

## Code has not been tested, might not even run.


## js/ResourceLoader.js

### Sprite

Constructor for a resource of type `sprite`.


#### Sprite.load(cb)

Loads the content of the sprite and calls the callback function when done.


#### Sprite.get(op, cb)

Gets the content of the sprite and calls the callback with the result.

`op` could include options for how to return the result.


### ResourceLoader(options)

Constructor for a ResourceLoader.

`options` is an object.

`options.resources` can be an array with objects.

Each object in `options.resources` must contain a `type` property which is the type of resource and a `name` property containing the name of the resource.
Objects can also contain other properties that will be passed to the resource constructor.


#### ResourceLoader.add(name, type, options)

Adds resource with name `name`, and value `new Type(options)` to resources array.


#### ResourceLoader.get(name, options, cb)

Calls `name.get(options)`.


#### ResourceLoader.setType(name, function)

Adds a new resource type with name `name` and constructor `function` to the types array.


#### ResourceLoader.load(name, cb)

Calls `name.load(cb)`.


#### ResourceLoader.loadAllSync(cb)

Helper for ResourceLoader.loadAll(), loads all the resources in order.


#### ResourceLoader.loadAllAsync(cb)

Helper for ResourceLoader.loadAll(), loads all the resources at the same time.


#### ResourceLoader.loadAll(cb, sync)

Loads all of the resources and calls `cb` at the very end.

Pass `sync` as true if you want a sync load.
