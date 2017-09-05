angular.module('app')
.service('lacreService', ['$http', function($http){
	var salvar = function(obj){
		var promise = $http.post('http://ccuanexos.herokuapp.com/lacre/', obj);
		promise.then(function(){
		}).catch(function(){
			alert('Problemas no lacreService!');
		})
	}

	var get = function(lacre){
		return $http.get('http://ccuanexos.herokuapp.com/lacre/numero/' + lacre);
	}

	return{
		salvar: salvar,
		get: get
	}
}])