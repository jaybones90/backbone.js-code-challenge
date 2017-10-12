var PostListView = SOCIView.extend({
  tagName: 'div',
  template: _.template( $('#PostListView').html()),
  events: {
	 'change #drop-down' : 'sortCollection',
   'submit' : 'searchCollection',
   'click .sort-arrows' : 'reverseSortOrder',
   'click .next-page' : 'nextPage',
   'click .previous-page' : 'previousPage'
 },
  initialize: function() {
    this.page = 1;
    this.firstPage = 1;
    this.perPage = 5;
    this.lastPage = Math.ceil(this.collection.length / 5);
    this.collection.models = this.collection.paginate(this.page, this.perPage);
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
  nextPage: function() {
    this.page++;
    if (this.page > this.lastPage) {
      this.page = this.lastPage;
      $('.next-page').css('background-color', 'red');
    } else {
      this.collection.models = this.collection.paginate(this.page, this.perPage);
      this.render();
    }
  },
  previousPage: function() {
    this.page--;
    if (this.page < this.firstPage) {
      this.page = 1;
      $('.previous-page').css('background-color', 'red');
    } else {
      this.collection.models = this.collection.paginate(this.page, this.perPage);
      this.render();
    }
  }
});
