import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DiagonalENV.locationType
});

Router.map(function() {
  this.resource('route', {path: "/route/:route_name"})
});

export default Router;
