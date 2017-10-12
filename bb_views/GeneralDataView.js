var GeneralDataView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template( $('#GeneralDataView').html()),
	initialize: function() {
    approvedPosts = this.collection.getApprovedPosts();
    pendingPosts = this.collection.getPendingPosts();
    rejectedPosts = this.collection.getRejectedPosts();
		this.render();
	},
	render: function(){
    this.$el.html(this.template({approved: approvedPosts.length, total: this.collection.total, pending: pendingPosts.length, rejected: rejectedPosts.length}));
    return this;
	}
});
