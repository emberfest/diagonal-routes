export default Em.Component.extend({
  tail: function () {
    return this.get('parents').slice(1);
  }.property('parents.[]'),

  route: Em.computed.alias('parents.firstObject'),
  name: Em.computed.alias('route.value.name'),
  hasChildren: Em.computed.alias('route.children.length')

});
