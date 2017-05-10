app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: '../views/home.html'
		})

		.when('/ballot', {
			templateUrl: '../views/ballot1.html'
		})

		.when('/results',{
			templateUrl: '../views/results1.html',
			controller: 'ResultController'
		})
		
		.otherwise({
			redirectTo:'/'
		});

	$locationProvider.html5Mode(true);

}]);