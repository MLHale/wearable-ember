import Ember from 'ember';

export default Ember.C3.ChartComponent.extend({
	/**
    Interaction
    */
    interaction: {},
    updateflag: false,
	_config: function() {
        var self = this;
        var c = self.getProperties([
            'data',
            'axis',
            'regions',
            'bar',
            'pie',
            'donut',
            'grid',
            'legend',
            'tooltip',
            'subchart',
            'zoom',
            'size',
            'padding',
            'color',
            'transition',
            'interaction'
        ]);
        c.bindto = self.get('element');
        return c;
    }.property('element','data','axis','regions','bar','pie','donut','grid','legend','tooltip',
    	'subchart','zoom','size','padding','color','transition', 'interaction'),
    dataDidChange: function() {
      var self = this;
      var chart = self.get('chart');
      chart.load(self.get('data'));
    }.observes('data').on('didInsertElement'),
    dataDidChange2: function(){
        var self = this;
        var chart = self.get('chart');
        chart.load(self.get('data'));
    }.observes('updateflag')
});
