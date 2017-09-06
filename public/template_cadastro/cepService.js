angular.module('app')
.service('cepService', ['$http', function($http){
	var get = function(cep){
		return  $http.get('https://viacep.com.br/ws/' + cep + '/json/');
	}

	
	return {
		get: get
	}

	
}])