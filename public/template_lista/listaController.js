angular.module('app')
.controller('listaController', ['cadastroFactory', '$window', 'consespService', '$scope', '$route', '$location', function(cadastroFactory, $window, consespService, $scope, $route, $location){
	var vm = this;
	var arrayColaboradores;
	vm.user = $window.localStorage['usuario'];
	vm.listaColaboradores = [];

	var lista = document.getElementById("lista");
	lista.selectedIndex = 1;

	function compareNome(a,b) {
	  	if(a.nome < b.nome){
	  		return -1;
	  	}else if (a.nome > b.nome){
	  		return 1;
	  	}else{
	  		return 0;
	    }	 
	}

	var promise = consespService.getConcursos();
	promise.then(function(data){
		vm.opcoes = data.data;
	});

	
	
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	
	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
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
		var promise2 = consespService.getColaboradores();
		promise2.then(function(data){
			arrayColaboradores = data.data;
			vm.listaColaboradores = [];
			arrayColaboradores.forEach(function(cadastro){
				vm.listaColaboradores.sort(compareNome);
				cadastro.concursos.forEach(function(concurso){
					if(concurso.nome === obj.nome){
						cadastro.funcao = concurso.funcao;
						cadastro.local = vm.lista.nome;
						cadastro.data = concurso.data;
						vm.listaColaboradores.push(cadastro);
					}
				})
			})
		})
	}

	vm.imprimir = function(value){
		cadastroFactory.set(value);
		$location.path('imprimir');
	}

	vm.excluir = function(value){
		//necessário se faz recuperar o valor do _id desse concurso;
		var obj = {}

		var filtro = function(value){
			return value.nome === vm.lista.nome;
		}

		var res = value.concursos.filter(filtro);

		obj.idCadastro = value._id;
		obj.idConcurso = res[0]._id;
		
		var promise = consespService.removerConcurso(obj);

		promise.then(function(data){
			if(data.status === 200){
					var index = vm.listaColaboradores.findIndex(i => i.nome === value.nome);
					vm.listaColaboradores.splice(index, 1);
			}
						
		})



		
	}

}]);