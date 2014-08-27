export default Em.ObjectController.extend({
  parentsAndSelf: function () {
    return this.get('parents').concat(this.get('model'));
  }.property('parents.[]', 'model')
});
