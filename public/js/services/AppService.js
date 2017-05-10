app.factory('AppService', ['$http', function($http) {

	return {
		

		isBlankArr : function(arr){
			for(var each in arr){
				var val = arr[each];
				if(val == "" || val === null || val === undefined) return true;
			}
			return false;
		},

		// Get all numbers from object as assure proper ordering
		validForm : function(form){
			var order = [];
			for(var key in form){
				order.push(Number(form[key]));
			}
			for(var i = 1; i <= order.length; ++i) {
				if(order.indexOf(i) == -1) return false;
			}
			return true;
		},

		loginGet : function() {
			return $http.get('/login');
		},

		loginPost : function(username, password) {
			return $http.post('/login', {user: username, password: password});
		},

		logout: function() {
			return $http.get('/logout');
		},

		voteGet : function() {
			return $http.get('/vote');
		},

		votePost : function(id, info) {
			return $http.post('/vote/'+id, info);
		},

		totalVote : function(id) {
			return $http.get('/totalvotes/'+id);
		}
	}
}]);