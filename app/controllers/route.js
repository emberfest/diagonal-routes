export default Em.ObjectController.extend({
  needs: ['application'],
  isShowingSubStates: Em.computed.alias('controllers.application.isShowingSubStates'),
  parentsAndSelf: function () {
    return this.get('parents').concat(this.get('model'));
  }.property('parents.[]', 'model')
});
