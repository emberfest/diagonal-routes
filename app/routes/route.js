export default Ember.Route.extend({
  model: function (params) {
    var route = this.controllerFor('application')
      .routeFor(params.route_name);
    if(!route) {
      this.transitionTo('index');
    }
    return route;
  },

  serialize: function (route) {
    return {route_name: route.value.name};
  }
});
