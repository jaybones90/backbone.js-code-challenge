var ModalView = SOCIView.extend({
  tagName: 'div',
  className: 'modal',
  template: _.template( $('#ModalView').html()),
  events: {
    'click .close' : 'hide'
  },
  initialize: function(model) {
    status = model.status.text
  },
  hide: function() {
    this.$el.hide();
  },
  render: function() {
    this.$el.html(this.template({post: this.model.attributes, status: status}));
    return this;
  }
});
