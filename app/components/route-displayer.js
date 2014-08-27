export default Ember.Component.extend({
  isVisible: function () {
    if(!this.get('route')) { return false; }
    if(this.get('isShowingSubStates')) {
      return true;
    }

    return !this.get('route').isSubState;
  }.property('isShowingSubStates', 'isSubState')
});
