angular.module('app')
.controller('escalaController', ['$window', 'consespService',function($window, consespService){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.colaboradores = {}
	var arrayDeColaboradores = [];
	vm.concursoAtual = {}

	var promise = consespService.getConcursos();
	promise.then(function(data){
		vm.opcoes = data.data;
	});


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

	//função para transformar a string de data da resposta em um data real
	var geraData = function(data){
		var data = data.substring(0,4) + '-' + data.substring(5,7) + '-' + data.substring(8,10);
		
	};


	vm.buscar = function(value){


		if(vm.concursoAtual){
			console.log(vm.concursoAtual.periodo);
			var promiseColaboradores = consespService.getColaboradores();
			promiseColaboradores.then(function(data){

			var filtro = function(value){
				console.log(vm.concursoAtual.periodo);
				if(vm.concursoAtual.periodo == 'Manha'){
					return (value.dataEscalado != vm.concursoAtual.data) || value.manha == 0;
				}else{
					return (value.dataEscalado != vm.concursoAtual.data) || value.tarde == 0;
				} 				
			}

			data.data = data.data.filter(filtro);

			console.log(data.data);
			
			vm.colaboradores = data.data.sort(compareNome);
	
			})	
		}else{
			$window.alert("Escolha um concurso.");
		}
		
	}


	
	vm.salvar = function(value){
		var filtro = function(value){
			return value.escolhido
		}

		var resp = vm.colaboradores.filter(filtro);

		var array = [];

		resp.forEach(function(value){

			var obj = {}
			obj.cpf = value.cpf;
			obj.dataEscalado = vm.concursoAtual.data;
			if(vm.concursoAtual.periodo === 'Manha'){
				obj['manha'] = 1;
			}else{
				obj['tarde'] = 1;
			}
			array.push(obj);
		})


		array.forEach(function(value){
			var promise = consespService.setStatusConcurso(value);
			promise.then(function(data){
				vm.colaboradores = {}
			})
		})
	}
	

}]);