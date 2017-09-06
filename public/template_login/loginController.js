angular.module('app')
.controller('loginController', ['$window', 'agentesService', '$location', 'localService', function($window, agentesService, $location, localService){
	var vm = this;
	vm.showError = false;
	vm.user = null;
	vm.pass = null;
	vm.locais = localService.getLogin();

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}



	vm.logar = function(){

		
			vm.showErrorLocal = false;
			vm.showError = false; 
			vm.mostrarLoading = true;
			 var promise = agentesService.getAuth(vm.user);
			 promise.then(function(usuario){
		
			 if(!isEmpty(usuario.data)){
				 	if(usuario.data.senha === vm.pass){
				 		$window.localStorage['usuario'] = usuario.data.nome;
				 		$location.path('concursos');
				 	}else{
				 		vm.showError = true;
				 	}
			 }else{
			 	vm.showError = true;
			 }
			 	vm.mostrarLoading = false;
			 })

			 promise.catch(function(){
			 	vm.mostrarLoading = false;
			 })
		
	}
}])