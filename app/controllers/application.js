import Ember from "ember";
import RouteDebug from "diagonal/lib/route-debug";

export default Ember.Controller.extend({
  isShowingSubStates: false,

  routesInput: Em.computed( function() {
    return "this.resource('posts');\n" +
    "this.resource('post', {path: '/posts/:post_id'}, function () {\n" +
    "  this.route('new');\n" +
    "  this.route('edit');\n" +
    "  this.resource('comments');\n" +
    "});\n" +
    "this.route('signup');"
  }),

  routeTree: Em.computed('theApplication', 'isError', function () {
    if (this.get('isError')) {
      return null;
    }
    var rd = RouteDebug.create({
      application: this.get('theApplication')
    });

    return this.addParents(rd.get('routeTree'));
  }),

  routeFor: function (name, start) {
    console.log('searching for route', name, start);
    var tree = start || this.get('routeTree');
    if (tree.value.name == name) {
      console.log('found', tree);
      return tree;
    }

    if(tree.children) {
      var children = tree.children.map(function (child) {
        return this.routeFor(name, child);
      }, this).compact();

      if (children.length) {
        return children[0];
      }
    }
  },

  addParents: function (node, parent) {
    if(parent) {
      node.parent = parent;
    }
    if(node.children && node.children.length) {
      node.children.forEach(function (child) {
        this.addParents(child, node);
      }, this);
    }
    return node;
  },

  isError: Em.computed('theApplication', function () {
    return (this.get('theApplication') instanceof Error);
  }),

  errorLineNumber: function () {
    return this.get('errorMatch')[1]
  }.property('errorMatch'),

  errorColumn: function () {
    return this.get('errorMatch')[2]
  }.property('errorMatch'),

  errorMatch: function () {
    return this.get('theApplication').stack.match(/<anonymous>:(\d+):(\d+)/)
  }.property('theApplication'),

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
      eval(evalStr);
    } catch (e) {
      return e;
    }
    Ember.run(App, 'advanceReadiness');
    container.lookup('router:main').startRouting();
    this.oldApp = App;
    return App;
  }.property('routesInput')
});
