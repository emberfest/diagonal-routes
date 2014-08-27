export default Em.Component.extend({
  isVisible: function () {
    if(this.get('isShowingSubStates')) {
      return true;
    }

    return !this.get('isSubState');
  }.property('isShowingSubStates', 'isSubState'),

  isSubState: function () {
    return this.get('route.value.name').match(/(^|\.)(loading|error)$/);
  }.property('route.value.name')
});
