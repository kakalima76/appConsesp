
angular.module('app')

.factory('cadastroFactory', [function(){
	var obj;

	var set = function(value){
		obj = value;
	}	


	var get = function(){
		return obj;
	}

	return {
		get: get,
		set: set
	}

}])