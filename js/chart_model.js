Montric.ChartModel = Ember.Object.extend();

Montric.ChartModel.reopenClass({
    collection: Ember.A(),

    find: function(id) {
        return Montric.Model.find('/json/chart', id, Montric.ChartModel, 'chart');
    },

    findAll: function() {
        return Montric.Model.findAll('/json/chart', Montric.ChartModel, 'chart');
    }
});