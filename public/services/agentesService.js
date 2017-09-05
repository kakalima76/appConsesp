angular.module('app')
.service('agentesService', ['$http', function($http){
	var get = function(){
		return  $http.get('http://ccuanexos.herokuapp.com/agentes');
	}

	var getAuth = function(matricula){
		return $http.get('http://ccuanexos.herokuapp.com/agentes/escala/' + matricula);
	}

	return {
		get: get,
		getAuth: getAuth
	}

	
}])