angular.module('app', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'template_login/login.html',
		controller: 'loginController',
		controllerAs: 'vm'
	})

	.when('/concursos', {
		templateUrl: 'template_concurso/concurso.html',
		controller: 'concursoController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}*/
	})

	.when('/cadastro', {
		templateUrl: 'template_cadastro/cadastro.html',
		controller: 'cadastroController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}*/
	})

	.when('/estatisticas', {
		templateUrl: 'template_estatistica/estatistica.html',
		controller: 'estatisticaController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}*/
	})

	.when('/lacres', {
		templateUrl: 'template_lacre/lacre.html',
		controller: 'lacreController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}*/
	})

	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
  		enabled: false,
  		requireBase: false
	});

	$httpProvider.interceptors.push('timestampInterceptor');


}])