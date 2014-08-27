export default Ember.Component.extend({
  isVisible: function () {
    if(!this.get('route')) { return false; }
    if(this.get('isShowingSubStates')) {
      return true;
    }

    return !this.get('isSubState');
  }.property('isShowingSubStates', 'isSubState'),

  isSubState: function () {
    return this.get('route.value.name').match(/(^|\.)(loading|error)$/);
  }.property('route.value.name')
});
