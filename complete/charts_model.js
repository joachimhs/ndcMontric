Montric.ChartsModel = Montric.Model.extend({
    chart: function() {
        var chart = null;

        if(this.get('chart_id')) {
            chart = Montric.ChartModel.find(this.get('chart_id'));
        }

        return chart;
    }.property('chart_id')
});

Montric.ChartsModel.reopenClass({
    collection: Ember.A(),

    find: function(id) {
        return Montric.Model.find('/json/charts', id, Montric.ChartsModel, "chart");
    },

    findAll: function() {
        return Montric.Model.findAll('/json/charts', Montric.ChartsModel, "charts");
    }
});