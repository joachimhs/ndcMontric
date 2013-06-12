Montric.Model = Ember.Object.extend();

Montric.Model.reopenClass({
    find: function(url, id, type, key) {
        var foundItem = this.isInMap(id, type);

        if (!foundItem) {
            foundItem = type.create({id: id});
            $.getJSON(url + "/" + id, function(data) {
                if (data[key]) {
                    foundItem.setProperties(data[key]);
                }
            });

            Ember.get(type, 'collection').pushObject(foundItem);
        }

        return foundItem;
    },

    findAll: function(url, type, key) {
        var collection = this;

        $.getJSON(url, function(data) {
            $.each(data[key], function(i, row) {
                var item = collection.isInMap(row.id, type);
                if (!item) {
                    item = type.create();
                    Ember.get(type, 'collection').pushObject(item);
                }
                item.setProperties(row);
            });
        });

        return Ember.get(type, 'collection');

    },

    isInMap: function(id, type) {
        var foundItem = null;

        Ember.get(type, 'collection').forEach(function(item) {
            if (item.get('id') === id) foundItem = item;
        });

        return foundItem;
    }
})