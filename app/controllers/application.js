import Ember from "ember";
import RouteDebug from "diagonal/lib/route-debug";

export default Ember.Controller.extend({
  routeTree: Em.computed(function () {
    var rd = RouteDebug.create({
      application: this.container.lookup('application:main')
    });

    return rd.get('routeTree');
  })
});
