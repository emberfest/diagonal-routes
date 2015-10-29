export default Em.ObjectController.extend({
  usePods: true,
  podModulePrefix: 'pods',
  needs: ['application'],
  isShowingSubStates: Em.computed.alias('controllers.application.isShowingSubStates'),
  parentsAndSelf: function () {
    return this.get('parents').concat(this.get('model'));
  }.property('parents.[]', 'model'),

  genPath: function (singular, plural, ext) {
    if (this.get('usePods')) {
      return 'app/' + this.get('podModulePrefix') + '/' + this.get('baseDir') + '/' + singular + '.' + ext;
    } else {
      return 'app/' + plural + '/' + this.get('baseDir') + '.' + ext;
    }
  },

  baseDir: Ember.computed('value.name', function () {
    return this.get('value.name').replace(/\./g, '/');
  }),

  routeFile: Ember.computed('baseDir', 'usePods', 'podModulePrefix', function () {
    return this.genPath('route', 'routes', 'js');
  }),

  templateFile: Ember.computed('baseDir', 'usePods', 'podModulePrefix', function () {
    return this.genPath('template', 'templates', 'hbs');
  }),

  controllerFile: Ember.computed('baseDir', 'usePods', 'podModulePrefix', function () {
    return this.genPath('controller', 'controllers', 'js');
  })
});
