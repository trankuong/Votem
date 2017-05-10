app.controller('ResultController', ['$scope', '$window', 'AppService', function($scope, $window, AppService) {
	
	$scope.legend = {legend: {display: true}};
	
	$scope.options = {
		scales: {
			yAxes: [
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				},
				{
					id: 'y-axis-2',
					type: 'linear',
					display: true,
					position: 'right'
				}
			]
		}
	};

  $scope.count = {};

	AppService.totalVote(1).then(
		function(success){
			
			var groups = success.data.voteCounts;

			for(var group in groups){
				$scope.count[group] = {};
				if(!Array.isArray(groups[group][Object.keys(groups[group])[0]])){
					
					$scope.count[group]['label'] = [];
					$scope.count[group]['data'] = [];
					
					for(var key in groups[group]){
						$scope.count[group]['label'].push(key);
						$scope.count[group]['data'].push(groups[group][key]);
					}
				}
				else{
					$scope.count[group]['label']  = [];
					$scope.count[group]['data']   = [];
					$scope.count[group]['series'] = ["Rank 1", "Rank 2", "Rank 3", "Rank 4"];
	

					var first  = [];
					var second = [];
					var third  = [];
					var fourth = [];

					for(var key in groups[group]){
						var one   = 0;
						var two   = 0;
						var three = 0; 
						var four  = 0;
						for(var index in groups[group][key]){
							if(groups[group][key][index] == 1)  one += 1;
							else if (groups[group][key][index] == 2) two += 1;
							else if (groups[group][key][index] == 3) three += 1;
							else if (groups[group][key][index] == 4) four += 1;
						}
						first.push(one);
						second.push(two);
						third.push(three);
						fourth.push(four);
						$scope.count[group]['label'].push(key);
					}
					$scope.count[group]['data'].push(first);
					$scope.count[group]['data'].push(second);
					$scope.count[group]['data'].push(third);
					$scope.count[group]['data'].push(fourth);
				}
			}
		}
	);

	$scope.logout = function(){
		AppService.logout().then(
			function(success) {
				$scope.loggedIn = false;
				$window.location.href = '/';
			}
		);
	};

}]);