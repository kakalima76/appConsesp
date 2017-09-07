angular.module('app')
.controller('listaController', ['cadastroFactory', '$window', 'consespService', '$scope', '$route', '$location', function(cadastroFactory, $window, consespService, $scope, $route, $location){
	var vm = this;
	var arrayColaboradores;
	vm.user = $window.localStorage['usuario'];
	vm.listaColaboradores = [];

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
		var funcao;

		vm.listaColaboradores = [];
		arrayColaboradores.forEach(function(cadastro){
			cadastro.concursos.forEach(function(concurso){
				if(concurso.nome === obj.nome){
					vm.listaColaboradores.push(cadastro);
					cadastro.funcao = concurso.funcao;
					cadastro.local = vm.lista.nome;
				}
			})
		})

		console.log(arrayColaboradores);

	}

	vm.imprimir = function(value){
		cadastroFactory.set(value);
		$location.path('imprimir');
	}

	vm.excluir = function(array){
		//necessário se faz recuperar o valor do _id desse concurso;
		var obj = {}

		var filtro = function(value){
			return value.nome === vm.lista.nome;
		}

		var res = array.concursos.filter(filtro);

		obj.idCadastro = array._id;
		obj.idConcurso = res[0]._id;
		
		var promise = consespService.removerConcurso(obj);

		promise.then(function(data){
			if(data.status === 200){
				$route.reload();
			}
		})

	}

}]);