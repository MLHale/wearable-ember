import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		Ember.$(".button-collapse").sideNav();
	}
});