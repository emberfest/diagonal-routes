export default Ember.Component.extend({
  tagName: "textarea",
  _initializeEditor: function() {
    var self = this;
    this.$().val(this.get('value'));
    var codemirror = CodeMirror.fromTextArea(self.$().get(0), {
      lineWrapping: true,
      lineNumbers: true,
      mode: 'javascript',
      theme: 'solarized',
      viewportMargin: Infinity
    });

    codemirror.on("change", function(instance){
      Ember.run(function(){
        self.set("value", instance.getValue());
      });
    });

    this.set("editor", codemirror);

  }.on('didInsertElement'),

  updateValue: function(){
    if(this.get("editor").getValue() !== this.get("value")){
      this.get("editor").setValue(this.get("value"));
    }
  }.observes("value")

});
