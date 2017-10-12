var ListContainerView = Backbone.View.extend({
	tagName: 'div',
	className: 'list-container-view',
	template: _.template( $('#ListContainerView').html()),
	initialize: function() {
		this.render();
	},
	render: function(){
		this.$el.empty();
		this.$el.append(this.template());
			this.$el.append(new PostListView({collection: this.collection}).render().el);
			this.$el.find('#table-body').append(new GeneralDataView({collection: this.collection}).render().el);
		return this;
	}
});
