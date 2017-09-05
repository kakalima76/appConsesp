angular.module('app')
.service('authService', ['$q', function($q){
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	var autentica = function(usuario){
		var deferred = $q.defer();

		if(isEmpty(usuario)){
			deferred.reject('não logado');
		}else{
			if(usuario.length > 0){
				deferred.resolve('logado');
			}else{
				deferred.reject('não logado');
			}
		}

		return deferred.promise;
	}

	return {
		autentica: autentica
	}

}]);