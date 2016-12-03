# tilad
A tile-based adventure game... or at least the start for one.

## None of the code has been tested, might not even run.

### I'm documenting the code for myself, but feel free to use it in whatever projects you want, any utility class will be contained in a single JavaScript file.


## js/ResourceLoader.js

### Sprite

Constructor for a resource of type `sprite`.


#### Sprite.load(cb)

Loads the content of the sprite and calls the callback function when done.


#### Sprite.get(op, cb)

Gets the content of the sprite and calls the callback with the result.

`op` could include options for how to return the result.


### ResourceLoader

Constructor for a ResourceLoader.


#### ResourceLoader.add(name, type, options)

Adds resource with name `name`, and value `new Type(options)` to resources array.


#### ResourceLoader.get(name, options, cb)

Calls `name.get(options)`.


#### ResourceLoader.setType(name, function)

Adds a new resource type with name `name` and constructor `funciton` to the types array.


### todo

#### ResourceLoader.load(name, cb)

Calls `name.load(cb)`.


#### ResourceLoader.loadAll(method)

Loads all of the resources.

`method` can be `sync` or `async`.

`sync` could be implemented by chaining the callback of a resource with the load of the next one.

`async` could be implemented by checking if all resources all loaded after each callback of a resource.
