var ListItemCollection = Backbone.Collection.extend({
	baseUrl: '/api/get_accounts',
	url: '/api/get_accounts',
	model: ListItemModel,
	total: 0,
	sortKey: 'id',
	sortDirection: 1,
	// Sample data for this test
	TESTDATA: {"status":"ok","posts":[{"id":"1","schedule":"2020-0422 17:00:00","utc_offset":"420","project_id":"1","network":"facebook","network_name":"TestFacebookPage","network_thumb":"https://scontent.xx.fbcdn.net/v/t1.0-9/17634406_1854330461448271_6787736791983791423_n.jpg?oh=e4c3a3573c0fc59359422cfd66a3865a&oe=598721E7","message":"Test Post 1 (just text, approved)","data":[],"customer_approved":"1","manager_approved":"1","rejection_message":"","created_at":"2020-0413 17:41:03","created_by":"admin","created_by_id":"1","created_by_name":"John Admin"},{"id":"2","schedule":"2020-0419 19:00:00","project_id":"1","network":"facebook","network_name":"TestFacebookPage","network_thumb":"https://scontent.xx.fbcdn.net/v/t1.0-9/17634406_1854330461448271_6787736791983791423_n.jpg?oh=e4c3a3573c0fc59359422cfd66a3865a&oe=598721E7","message":"Test Post 2 (text with image, approved)  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","data":{"pictures":["https://pbs.twimg.com/media/C9T6n0UUwAAOBaU.jpg"],"image_added":"true","picture":"https://pbs.twimg.com/media/C9T6n0UUwAAOBaU.jpg","type":"photo"},"customer_approved":"1","manager_approved":"1","rejection_message":"","rejection_message_manager":"","created_at":"2020-0413 17:42:34","created_by":"admin","created_by_id":"1","created_by_name":"John Admin"},{"id":"3","schedule":"2020-0421 22:00:00","network":"facebook","network_name":"TestFacebookPage","network_thumb":"https://scontent.xx.fbcdn.net/v/t1.0-9/17634406_1854330461448271_6787736791983791423_n.jpg?oh=e4c3a3573c0fc59359422cfd66a3865a&oe=598721E7","message":"Test Post 3 (link, approved) http://www.adultswim.com/videos/rick-and-morty/","data":{"image_added":"true","pictures":["http://i.cdn.turner.com/adultswim/big/img/2015/07/17/Rick%26MortyS02_fbsearchTn.jpg"],"picture":"http://i.cdn.turner.com/adultswim/big/img/2015/07/17/Rick%26MortyS02_fbsearchTn.jpg","link":"http://www.adultswim.com/videos/rick-and-morty/","name":"Watch Rick and Morty on Adult Swim","caption":"www.adultswim.com","description":"Every episode of Rick and Morty is now on AdultSwim.com for free. Rick is a mad scientist who drags his grandson, Morty, on crazy sci-fi adventures. Their escapades often have potentially harmful consequences for their family and the rest of the world. Join Rick and Morty on AdultSwim.com as they trek through alternate dimensions, explore alien planets, and terrorize Jerry, Beth, and Summer.","domain":"www.adultswim.com","type":"link"},"customer_approved":"1","manager_approved":"1","rejection_message":"","created_at":"2020-0413 17:43:29","created_by":"admin","created_by_id":"1","created_by_name":"John Admin"},{"id":"4","schedule":"2020-0424 17:00:00","network":"facebook","network_name":"TestFacebookPage","network_thumb":"https://scontent.xx.fbcdn.net/v/t1.0-9/17634406_1854330461448271_6787736791983791423_n.jpg?oh=e4c3a3573c0fc59359422cfd66a3865a&oe=598721E7","message":"Test Post 4 (text, pending)","data":[],"customer_approved":"0","manager_approved":"1","rejection_message":"","created_at":"2020-0413 17:43:48","created_by":"admin","created_by_id":"1","created_by_name":"John Admin"},{"id":"5","schedule":"2020-0426 19:00:00","network":"facebook","network_name":"TestFacebookPage","network_thumb":"https://scontent.xx.fbcdn.net/v/t1.0-9/17634406_1854330461448271_6787736791983791423_n.jpg?oh=e4c3a3573c0fc59359422cfd66a3865a&oe=598721E7","message":"Test Post 5 (picture, pending)","data":[],"customer_approved":"0","manager_approved":"1","rejection_message":"","created_at":"2020-0413 17:44:03","created_by":"admin","created_by_id":"1","created_by_name":"Jason"},{"id":"6","schedule":"2020-0428 21:00:00","network":"facebook","network_name":"TestFacebookPage","network_thumb":"https://scontent.xx.fbcdn.net/v/t1.0-9/17634406_1854330461448271_6787736791983791423_n.jpg?oh=e4c3a3573c0fc59359422cfd66a3865a&oe=598721E7","message":"Test Post 6 (link, pending) https://www.reddit.com/","data":{"image_added":"true","pictures":["https://b.thumbs.redditmedia.com/2Hwaff37fC4f37j-3orrbjVAOVBChqbdm_dXeIhjlNw.jpg"],"picture":"https://b.thumbs.redditmedia.com/2Hwaff37fC4f37j-3orrbjVAOVBChqbdm_dXeIhjlNw.jpg","link":"https://www.reddit.com/","name":"reddit: the front page of the internet","caption":"www.reddit.com","description":"reddit: the front page of the internet","domain":"www.reddit.com","type":"link"},"customer_approved":"0","manager_approved":"1","rejection_message":"","created_at":"2020-0413 17:44:19","created_by":"admin","created_by_id":"1","created_by_name":"Jason"}],"total":"6"},

	initialize: function(models, options) {
		this.sortDirection = 1;
		this.total = this.TESTDATA.total;
		this.reset(this.TESTDATA.posts);
	},
	getApprovedPosts: function() {
		return _.where(this.TESTDATA.posts, {manager_approved: "1", customer_approved: "1"})
	},
	getPendingPosts: function() {
		return _.filter(this.TESTDATA.posts, function(post) {
		  return post.manager_approved === '0' || post.customer_approved === "0";
		});
	},
	getRejectedPosts: function() {
		return _.filter(this.TESTDATA.posts, function(post) {
		  return post.manager_approved === '-1' || post.customer_approved === "-1";
		});
	},
	comparator: function(a) {
		return this.sortDirection * a.get(this.sortKey);
	},
	sortByField: function(fieldName) {
		this.sortKey = fieldName;
		this.sort();
	},
	setSortDirection(direction) {
		this.sortDirection = direction;
		this.sort();
	},
	paginate : function(page, perPage) {
		this.reset(this.TESTDATA.posts);
		page = page-1;
		var collection = this;
		collection = _(collection.rest(page*perPage));
		collection = _(collection.first(perPage));
		return collection.map( function(model) { return model } );
	},
});
