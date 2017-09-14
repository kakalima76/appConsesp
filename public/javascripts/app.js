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

	.when('/escala', {
		templateUrl: 'template_escala/escala.html',
		controller: 'escalaController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}*/
	})

	.when('/lista', {
		templateUrl: 'template_lista/lista.html',
		controller: 'listaController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}*/
	})

	.when('/imprimir/:_id/:funcao/:local/:data', {
		templateUrl: 'template_imprimir/imprimir.html',
		controller: 'imprimirController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}*/
	})

	.when('/relacao', {
		templateUrl: 'template_relacao/relacao.html',
		controller: 'relacaoController',
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