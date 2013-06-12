Montric.Model = Ember.Object.extend();

Montric.Model.reopenClass({
    find: function(url, id, type, key) {
        console.log('find: ' + type + " id: " + id + " url: " + url + "/" + id);
        var foundItem = this.contentArrayContains(id, type);

        if (!foundItem) {
            console.log('!foundItem: ' + foundItem);
            foundItem = type.create({ id: id, isLoaded: false});
            $.getJSON(url + "/" +  id, function(data) {
                console.log(data);
                if (data[key]) {
                    foundItem.setProperties(data[key]);
                    foundItem.set('isLoaded', true);
                    foundItem.set('isError', false);
                }
            });
            Ember.get(type, 'collection').pushObject(foundItem);
        }

        console.log('found: ' + foundItem.get('id'));
        return foundItem;
    },

    contentArrayContains: function(id, type) {
        var contains = null;

        Ember.get(type, 'collection').forEach(function(item) {
            if (item.get('id') === id) {
                contains = item;
            }
        });

        return contains;
    },

    findAll: function(url, type, key) {
        console.log('findAll: ' + type + " " + url + " " + key);

        var collection = this;
        $.getJSON(url, function(data) {
            $.each(data[key], function(i, row) {
                var item = collection.contentArrayContains(row.id, type);
                if (!item) {
                    item =  type.create();
                    Ember.get(type, 'collection').pushObject(item);
                }
                item.setProperties(row);
                item.set('isLoaded', true);
                item.set('isError', false);
            });
        });

        return Ember.get(type, 'collection');
    }
});