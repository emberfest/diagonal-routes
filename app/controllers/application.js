import Ember from "ember";
import RouteDebug from "diagonal/lib/route-debug";

export default Ember.Controller.extend({
  isShowingSubStates: false,

  queryParams: ['routesInput'],

  routesInput: Em.computed( function() {
    return "this.resource('posts');\n" +
    "this.resource('post', {path: '/posts/:post_id'}, function () {\n" +
    "  this.route('new');\n" +
    "  this.route('edit');\n" +
    "  this.resource('comments', function() {\n" +
    "    this.route('new');\n" +
    "  });\n" +
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
    var tree = start || this.get('routeTree');
    if (tree.value.name == name) {
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

  addParents: function (node, parent, parents) {
    node.name = node.value.name;
    parents = (parents && parents.slice()) || [];
    if(parent) {
      node.parent = parent;
      parents.push(parent);
    }
    node.parents = parents;
    if(node.children && node.children.length) {
      node.children.forEach(function (child) {
        this.addParents(child, node, parents);
      }, this);
    }
    return node;
  },

  isError: Em.computed('theApplication', function () {
    return (this.get('theApplication') instanceof Error);
  }),

  errorLineNumber: function () {
    try {
      return this.get('errorMatch')[1]
    } catch (e) {
      return 'unknown';
    }
  }.property('errorMatch'),

  errorColumn: function () {
    try {
      return this.get('errorMatch')[2]
    } catch (e) {
      return 'unknown';
    }
  }.property('errorMatch'),

  errorMatch: function () {
    return this.get('theApplication').stack.match(/<anonymous>:(\d+):(\d+)/)
  }.property('theApplication'),

  transitionOnChange: function() {
    this.transitionToRoute('index');
  }.observes('theApplication'),

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
  }.property('routesInput'),

  actions: {
    showRoute: function(route) {
      this.transitionToRoute('route', route.name);
    }
  }
});
