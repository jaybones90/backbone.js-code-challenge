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
    this.status = this.getStatus();
    this.render();
  },
  render: function(){
    this.$el.html(this.template({post: this.model.attributes, status: this.status}));
    return this;
  },
  getStatus: function() {
    let attributes = this.model.attributes;
    let status = {};
    if ((attributes.customer_approved === "1") && (attributes.manager_approved === "1")) {
      status = { text: "Approved", css: "bg-success"};
    } else if ((attributes.customer_approved === "0") || (attributes.manager_approved === "0")) {
      status = {text: "Pending", css: "bg-warning"};
    } else if ((attributes.customer_approved === "-1") || (attributes.manager_approved === "-1")) {
      status = {text: "Rejected", css: "bg-danger"};
    }
    return status;
  },
  openDetails: function() {
    let status = this.getStatus();
    this.$el.find('#modal-placement').html(new ModalView({model: this.model, status: status}).render().el);
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
