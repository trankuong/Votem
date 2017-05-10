app.controller('MainController', ['$scope', '$location', '$window', 'AppService', function($scope, $location, $window, AppService) {

	$scope.voteOptions = [1, 2, 3, 4];

	// Init custom value to blank
	$scope.customS1 = "";

	$scope.votedIn = [];
	$scope.ballotError = "";
	$scope.loginError = "";

	// Form to send
	$scope.formData = {};

	// Check if logged in
	AppService.loginGet().then(
		function(success){
			console.log("login get is successful");
			if(success.data.success){
				AppService.voteGet().then(
					function(success){
						if(success.data.electionids) $scope.votedIn = success.data.electionids;
					}
				);
				$scope.loggedIn = true;	
			}
			else{
				$scope.loggedIn = false;
			}
		},
		//delete under later
		function(){
			console.log("error in getting login");
		}
	);

	$scope.$watch('customS1', function (newValue, oldValue) {
		if($scope.formData['group1'] != undefined){
			if(oldValue in $scope.formData['group1']){
				$scope.formData['group1'][newValue] = $scope.formData['group1'][oldValue];
				delete $scope.formData['group1'][oldValue];
			}
			if(newValue == "") {
				delete $scope.formData['group1'][newValue];
			}
		}
	});

	$scope.$watch('customCheck', function(newValue, oldValue) {
		if($scope.customChecked){
			if($scope.formData['group3'] === undefined) $scope.formData['group3'] = [newValue];
			else{
				var index = $scope.formData['group3'].indexOf(oldValue);	
				$scope.formData['group3'].splice(index, 1, newValue);
			}
		}
	});

	$scope.login = function(username, password) {
		AppService.loginPost(username, password).then(
			function(response){
				console.log("responsed");
				AppService.voteGet().then(
					function(success){
						if(success.data.elections) $scope.votedIn = success.data.elections;
					}
				);
				$scope.loggedIn = true;
				// Redirect to close modal :(
				$window.location.href = '/';
			},
			function(error){
				$scope.loginError = error.data.error;
			}
		)
	};

	$scope.logout = function(){
		AppService.logout().then(
			function(success) {
				$scope.loggedIn = false;
				$window.location.href = '/';
			}
		);
	};

	// To help set navbar active class
	$scope.isActive = function(path){
		return (path === $location.path());
	}

	// Adjust later to check for specific electionid
	$scope.Voted = function(){
		return ($scope.votedIn.length != 0);
	}

	// Add array for specific group to form object when checkboxes clicked
	$scope.clickCheckbox = function(group, value){
		if(!(group in $scope.formData)) {
			if(value === undefined) $scope.formData[group] = [];
			else $scope.formData[group] = [value];
		}
		else{
			var index = $scope.formData[group].indexOf(value);
			if(index == -1){
				$scope.formData[group].push(value);
			}
			else{
				$scope.formData[group].splice(index, 1);
			}
		}
	};

	$scope.sendBallot = function(){
		
		var info = {
			password: $scope.ballotPass,
			form: $scope.formData
		};

		// Remove blanks from objecdt
		if($scope.formData['group1']) {
			for(var key in $scope.formData['group1']){
				if(!key) {
					$scope.ballotError = "Can not have a blank Write-In";
					return;	
				}
			}
		}

		// Error check inputs before post request
		if($scope.formData['group3'] && ($scope.formData['group3'].length != 2) ) {
			$scope.ballotError = "Need to select two options for State Rep.";
		}
		else if($scope.formData['group3'] === undefined) {
			$scope.ballotError = "Need to select two options for State Rep.";
		}
		else if(($scope.formData['group3'].length == 2) && (AppService.isBlankArr($scope.formData['group3'])) ){
			$scope.ballotError = "Can not have a blank Write-In";
		}
		else if($scope.formData['group1'] && !AppService.validForm($scope.formData['group1'])){
			$scope.ballotError = "Need proper ordering for vote on Commander and Vice. Choices should begin at 1 and should not repeat.";
		}
		else{
			$scope.ballotError = "";
			AppService.votePost(1, info).then(
				function(success){
					$scope.votedIn = success.data.electionids;
				},
				function(error){
					$scope.ballotError = error.data.error;
				}
			);
		}
		
	};

}]);