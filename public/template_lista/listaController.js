angular.module('app')
.controller('listaController', ['$window', 'consespService', '$scope', function($window, consespService, $scope){
	var vm = this;
	var arrayColaboradores;
	vm.user = $window.localStorage['usuario'];

	var promise = consespService.getConcursos();
	promise.then(function(data){
		vm.opcoes = data.data;
	});

	var promise2 = consespService.getColaboradores();
	promise2.then(function(data){
		arrayColaboradores = data.data;
	})
	
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	
	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}

	function compareNome(a,b) {
	  	if(a.nome < b.nome){
	  		return -1;
	  	}else if (a.nome > b.nome){
	  		return 1;
	  	}else{
	  		return 0;
	    }	 
	}


	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		
	}

	vm.mudar = function(obj){

		console.log(obj.data);
		if(obj.periodo === "Manha"){
			
			var filtro = function(value){
				console.log(value.dataEscalado);
				return value.dataEscalado === obj.data && value.manha === 1;
			}

			vm.listaColaboradores = arrayColaboradores.filter(filtro);

			console.log(vm.listaColaboradores);

		}else{
			
			var filtro = function(value){
				console.log(value.dataEscalado);
				return value.dataEscalado === obj.data && value.tarde === 1;
			}

			vm.listaColaboradores = arrayColaboradores.filter(filtro);

			console.log(vm.listaColaboradores);

		}

		

	}


}]);