var PostListView = SOCIView.extend({
  tagName: 'div',
  template: _.template( $('#PostListView').html()),
  events: {
	 'change #drop-down' : 'sortCollection'
  },
  initialize: function() {
    this.listenTo(this.collection, 'sort remove', this.render);
    this.render();
  },
  render: function(){
    that = this;
    this.$el.empty();
    this.$el.append(this.template());
    _.each(this.collection.models, function(model){
      that.$el.append(new PostView({model: model}).render().el);
    })
    return this;
  },
  sortCollection: function() {
    var selectedOption = $("select option:selected").text();
    var attributeToSortBy = $("select option:selected").val();
    this.collection.sortByField(attributeToSortBy);
    $('#drop-down').val(attributeToSortBy);
  }
});
