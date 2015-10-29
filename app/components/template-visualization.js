export default Em.Component.extend({
  tail: function () {
    return this.get('parents').slice(1);
  }.property('parents.[]'),

  route: Em.computed.alias('parents.firstObject'),
  name: Em.computed.alias('route.value.name'),
  hasChildren: Em.computed.alias('route.children.length'),
  baseDir: Ember.computed('name', function () {
    return this.get('name').replace(/\./g, '/');
  }),

  templateFile: Ember.computed('baseDir', 'usePods', 'podModulePrefix', function () {
    return this.genPath('template', 'templates', 'hbs');
  }),

  genPath: function (singular, plural, ext) {
    if (this.get('usePods')) {
      return 'app/' + this.get('podModulePrefix') + '/' + this.get('baseDir') + '/' + singular + '.' + ext;
    } else {
      return 'app/' + plural + '/' + this.get('baseDir') + '.' + ext;
    }
  }

});
