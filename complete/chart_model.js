Montric.ChartModel = Montric.Model.extend({

});

Montric.ChartModel.reopenClass({
    collection: Ember.A(),

    find: function(id) {
        return Montric.Model.find('/json/chart', id, Montric.ChartModel, "chart");
    }
});