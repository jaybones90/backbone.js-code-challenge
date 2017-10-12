var PostListView = SOCIView.extend({
  tagName: 'div',
  template: _.template( $('#PostListView').html()),
  events: {
	 'change #drop-down' : 'sortCollection',
   'submit' : 'searchCollection',
   'click .sort-arrows' : 'reverseSortOrder',
   'click .paginate-arrows' : 'paginateCollection'
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
  },
  searchCollection: function(e) {
    e.preventDefault();
    let userInput = this.$el.find('input').val()
    let filteredCollection = _.filter(this.collection.models, function(model) {
      return (model.attributes.message == userInput || model.attributes.created_by_name == userInput);
    });
    this.collection.models = filteredCollection;
    this.render();
  },
  reverseSortOrder: function() {
    this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    this.collection.setSortDirection(this.sortOrder);
  },
  paginateCollection: function() {
    this.collection.pagination()
  }
});
