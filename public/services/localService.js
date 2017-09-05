angular.module('app')
.service('localService', [function(){
	var local = ['MOP01','MOP02','MOP03','MOP04','MOP05','MOP06','MOP07','MOP08', '24 HORAS', 'DEPÓSITO AVANÇADO'];
	var localAnexo = ['TODOS','MOP01','MOP02','MOP03','MOP04','MOP05','MOP06','MOP07','MOP08', '24 HORAS', 'DEPÓSITO AVANÇADO'];

	var getLogin = function(){
		return local;
	}

	var get = function(){
		return localAnexo;
	}

	return {
		getLogin: getLogin,
		get: get
	}

}])