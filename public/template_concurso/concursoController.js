angular.module('app')
.controller('concursoController', ['$window', 'consespService', function($window, consespService){
	var vm = this;
	vm.concurso = {}
	vm.opcoesPeriodo = ['Manha', 'Tarde'];
	
	vm.user = $window.localStorage['usuario'];
	


	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
	}
	

	
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}


	function compareFiltro(a,b,c,d) {
	  	if(a.filtro < b.filtro){
	  		return -1;
	  	}else if (a.filtro > b.filtro){
	  		return 1;
	  	}else{
	  		return 0;
	    }	 
	}

	function compareProduto(a,b,c,d) {
	  	if(a.produto < b.produto){
	  		return -1;
	  	}else if (a.produto > b.produto){
	  		return 1;
	  	}else{
	  		return 0;
	    }	 
	}


	vm.salvar = function(value){

		var promise = consespService.setConcurso(value);
		promise
		.then(function(data){
			console.log(data);
		});

		vm.concurso = {};
	}

	

}]);

