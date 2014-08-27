import Ember from "ember";
import RouteDebug from "diagonal/lib/route-debug";

export default Ember.Controller.extend({
  routesInput: Em.computed( function() {
    return "this.resource('posts');\n" +
    "this.resource('post', {path: '/posts/:post_id'}, function () {\n" +
    "  this.route('new');\n" +
    "  this.route('edit');\n" +
    "  this.resource('comments');\n" +
    "});\n" +
    "this.route('signup');"
  }),

  routeTree: Em.computed('theApplication', function () {
    var rd = RouteDebug.create({
      application: this.get('theApplication')
    });

    return rd.get('routeTree');
  }),

  theApplication: function() {
    if(this.oldApp) {
      Em.run(this.oldApp, 'destroy');
    }
    var App = Ember.Application.create({
      name: "App",
      rootElement: '#demo-app'
    });


    var container = App.__container__;

    App.Router.reopen({
      location: 'none'
    });
    App.deferReadiness();

    var Router = App.Router;
    try {
      var evalStr = "Router.map(function(){ " + this.get('routesInput') + " })";
    } catch (e) {
      return e;
    }
    eval(evalStr);
    Ember.run(App, 'advanceReadiness');
    container.lookup('router:main').startRouting();
    this.oldApp = App;
    return App;
  }.property('routesInput')
});
