angular.module('app')
.service('anexoService', ['$http',function($http){
	var get = function(data){
		return $http.get('http://ccuanexos.herokuapp.com/lacre/data/' + data);
	}

	return {
		get: get
	}
}])