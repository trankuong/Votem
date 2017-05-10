var app = angular.module('Votem', ['ngRoute', 'chart.js']);

app.config(['ChartJsProvider', function (ChartJsProvider) {
	// Configure all charts
	ChartJsProvider.setOptions({
		// chartColors: ['#FF5252', '#FF8A80'],
		responsive: false
	});
	// Configure all line charts
	ChartJsProvider.setOptions('line', {
		showLines: false
	});
}])