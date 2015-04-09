define(['hydrate', 'iris'], function (Hydrate, iris) {
    var dehydrate = function (data) {
        var resolver = iris.makeHydrateContextResolver(Hydrate);
        var hydrate = new Hydrate(resolver);
        return iris.dehydrateObject(data, hydrate);
    };

    return dehydrate;
});