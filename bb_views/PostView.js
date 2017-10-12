var PostView = SOCIView.extend({
  tagName: 'div',
  className: 'post',
  template: _.template( $('#PostView').html()),
  events: {
    'click .post-details' : 'openDetails',
    'mouseover' : 'showDelete',
    'mouseout' : 'hideDelete',
    'click .post-delete' : 'deletePost'
  },
  initialize: function() {
    status = this.getStatus();
    this.render();
  },
  render: function(){
    this.$el.html(this.template({post: this.model.attributes, status: status}));
    return this;
  },
  getStatus: function() {
    var attributes = this.model.attributes
    if ((attributes.customer_approved === "1") && (attributes.manager_approved === "1")) {
      return "Approved";
    } else if ((attributes.customer_approved === "0") || (attributes.manager_approved === "0")) {
      return "Pending";
    } else if ((attributes.customer_approved === "-1") || (attributes.manager_approved === "-1")) {
      return "Rejected";
    }
  },
  openDetails: function() {
    let status = this.getStatus();
    $('#modal-placement').html(new ModalView({model: this.model, status: status}).render().el);
  },
  showDelete: function() {
    deleteButton = this.$el.find('button')
    deleteButton.show();
  },
  hideDelete: function() {
    deleteButton.hide();
  },
  deletePost: function() {
    this.model.collection.remove(this.model);
    this.render();
  }

});
