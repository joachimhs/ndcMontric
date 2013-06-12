Ember.Application.reopen({
   init: function() {
       this._super();

       this.loadTemplates();
   },

    templates: [],

    loadTemplates: function() {
        var app = this;
        var templates = this.get('templates');

        app.deferReadiness();

        var promises = templates.map(function(name) {
            return Ember.$.get('/templates/' + name + ".hbs").then(function(data) {
                Ember.TEMPLATES[name] = Ember.Handlebars.compile(data);
            });
        });

        Ember.RSVP.all(promises).then(function() {
            app.advanceReadiness();
        });
    }
});

var Montric = Ember.Application.create({
    templates: ['application', 'header', 'charts', 'charts/chart']
});

Montric.Router.map(function() {
    this.resource('charts', {path: '/'}, function() {
        this.route('chart', {path: '/chart/:chart_id'})
    })
});

Montric.ChartsRoute = Ember.Route.extend({
    model: function() {
        return Montric.ChartsModel.findAll();
    }
});

Montric.ChartsChartRoute = Ember.Route.extend({
    model: function(chart) {
        return Montric.ChartModel.find(chart.chart_id);
    }
});