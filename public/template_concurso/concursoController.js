angular.module('app')
.controller('concursoController', ['$window', function($window){
	var vm = this;
	vm.concurso = {}
	
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

"06/09/2017"

	vm.salvar = function(value){
		//modelo americano para datas
		value.data = value.data.substring(6) + '-' + value.data.substring(3,5) + '-' + value.data.substring(0,2);
		console.log(value);
		vm.concurso = {};
	}

	

}]);

