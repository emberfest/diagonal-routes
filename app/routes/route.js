export default Ember.Route.extend({
  model: function (params) {
    return this.controllerFor('application')
      .routeFor(params.route_name);
  },

  serialize: function (route) {
    return {route_name: route.value.name};
  }
});
