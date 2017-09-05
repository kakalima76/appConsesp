angular.module('app')
.controller('lacreController', ['lacreService', '$window', function(lacreService, $window){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.sub_lacre = 'templates/sub_lacre.html';

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}

	vm.buscar = function(lacre){

		if(!isEmpty(lacre)){
				vm.mostrarLoading = true;
				var promise = lacreService.get(lacre);
				promise.then(function(dados){
				vm.mostrarLoading = false;
				vm.lacres = dados.data;
				});
				promise.catch(function(){
				vm.mostrarLoading = false;
				alert('Problemas no lacreService');
				})
		}else{
			alert('Informe um número de lacre!');
		}
		
	}

}]);