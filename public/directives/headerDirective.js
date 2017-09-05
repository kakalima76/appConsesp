angular.module('app')
.directive('widgetHeader', [function(){
	// Runs during compile
	return {
		
		scope: {
			titulo: '@titulo'
		},
		restrict: 'E',
		templateUrl: '/templates/header.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		/*link: function($scope, iElm, iAttrs, controller) {
			
		}*/
	};
}]);