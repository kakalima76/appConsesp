angular.module('app')
.controller('listaController', ['cadastroFactory', '$window', 'consespService', '$scope', '$route', '$location', '$filter',function(cadastroFactory, $window, consespService, $scope, $route, $location, $filter){
	var vm = this;
	var arrayColaboradores;
	vm.user = $window.localStorage['usuario'];
	vm.listaColaboradores = [];
	vm.classe = 'alert alert-success';
	vm.select = ['Mostrar todos'];

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


	var testaQuantidade = function(){
		if(vm.contador >= vm.lista.quantidade){
				vm.classe = "alert alert-danger";
		}else{
				vm.classe = 'alert alert-success';
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
				cadastro.nome = $filter('lowercase')(cadastro.nome)
				cadastro.concursos.forEach(function(concurso){

				
					if(concurso.nome === obj.nome){
						cadastro.funcao = concurso.funcao;
					}

					
					var index = vm.select.indexOf(cadastro.funcao);
						if(index === -1){
							if(!isEmpty(cadastro.funcao)){
							vm.select.push(cadastro.funcao);
							}
						}

					
				})
			})

			
			testaQuantidade();

		})
	}

	vm.filtrar = function(funcao){
			vm.funcoesQuantidade = 0;
			vm.contador = 0;
			vm.listaColaboradores = [];
			arrayColaboradores.forEach(function(cadastro){
				cadastro.nome = $filter('lowercase')(cadastro.nome)
				cadastro.concursos.forEach(function(concurso){

				
					if(concurso.nome === vm.lista.nome){
						cadastro.funcao = concurso.funcao;
						cadastro.local = vm.lista.nome;
						cadastro.funcaoFormatada = concurso.funcao.replace(/( )/g, "%20");
						cadastro.localFormatada = vm.lista.nome.replace(/( )/g, "%20");
						cadastro.data = concurso.data;
						vm.listaColaboradores.push(cadastro);

					}

					vm.listaColaboradores.sort(compareNome);

					var index = vm.select.indexOf(cadastro.funcao);
						if(index === -1){
							if(!isEmpty(cadastro.funcao)){
							vm.select.push(cadastro.funcao);
							}
						}

					
				})
			})

			var filtro = function(value){
				return value.funcao === funcao; 
			}

			vm.listaColaboradores.forEach(i => vm.contador++);
			testaQuantidade();

			if(funcao !== 'Mostrar todos'){
				vm.listaColaboradores = vm.listaColaboradores.filter(filtro);

				vm.listaColaboradores.forEach(i => vm.funcoesQuantidade++);

			}
			
			
	}

	vm.imprimir = function(){
		if(vm.listaColaboradores.length > 0){
			cadastroFactory.set(vm.listaColaboradores);
			$location.path('relacao');
		}else{
			$window.alert("Defina um concurso");
		}
		
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
					var index = arrayColaboradores.findIndex(i => i.nome === value.nome);
					arrayColaboradores.splice(index, 1);
					var index2 = vm.listaColaboradores.findIndex(i => i.nome === value.nome);
					vm.listaColaboradores.splice(index2, 1);


					vm.contador--;
					testaQuantidade();
			}
						
		})


	}



}]);