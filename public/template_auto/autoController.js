angular.module('app')
.controller('autoController', ['$uibModal', 'produtosService', 'bairrosService', 'agentesService', 'lacreService', '$window', function($uibModal, produtosService, bairrosService, agentesService, lacreService, $window){
	var vm = this;
	vm.showLacre = true;
	vm.arrayEscolha = [];
	vm.arrayExibe = [];
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];
	vm.produtos = produtosService.get().sort(compareProduto);
	vm.filtros = produtosService.getFiltro().sort(compareFiltro);
	vm.agentes = [];


	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
	}
	

	function compareAgentes(a,b) {
	  	if(a.nome < b.nome){
	  		return -1;
	  	}else if (a.nome > b.nome){
	  		return 1;
	  	}else{
	  		return 0;
	    }	 
	}

	var promise = agentesService.get();
	vm.agentesLoading = true;
	promise.then(function(dados){
		dados.data.forEach(function(value){
			vm.agentes.push({nome: value.nome});
		})

		vm.agentes = vm.agentes.sort(compareAgentes);
		vm.agentesLoading = false;
	})
	promise.catch(function(){
		vm.agentesLoading = false;
	})

	
	vm.bairros = bairrosService.getBairros();

	var soma = 0;

	vm.pegaRuas = function(value){
			function compareRuas(a,b,c,d) {
		  	if(a.logradouro < b.logradouro){
		  		return -1;
		  	}else if (a.logradouro > b.logradouro){
		  		return 1;
		  	}else{
		  		return 0;
		    }	 
		}
			vm.mostrarLoading = true;
			var promise = bairrosService.get(value);
			promise.then(function(dados){
			vm.ruas = dados.data.sort(compareRuas);
			vm.mostrarLoading = false;
			});
			promise.catch(function(){
			vm.mostrarLoading = false;
			});
	}


	vm.lancar = function(){
		vm.showLacre = false;
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

	vm.excluir = function(value){
		vm.arrayEscolha.splice(vm.arrayEscolha.indexOf(value), 1);
	}

	vm.confirmar = function(tipo){

		tipo.lacre = vm.lacre;
		if(!isEmpty(vm.trm)){
			tipo.trm = vm.trm;
		}else{
			tipo.trm = '';
		}

		vm.produto = null;
		var newArrayFiltro =  vm.filtros;
		if(tipo && !isEmpty(vm.lacre)){
					if(!isEmpty(tipo.quantidade)){

						function filtrarEstatística(value){
							if(value.filtro === tipo.tipo){
								return true;
							}
						}

						function filtrarProduto(value){
							if(value.produto === tipo.produto){
								return true;
							}
						}

						newArrayFiltro =newArrayFiltro.filter(filtrarEstatística);
						newArrayFiltro.forEach(function(value){
							if(value['total']){
								value.total = value.total + tipo.quantidade;
							}else{
								value.total = tipo.quantidade;
							}
						})
				
				vm.arrayEscolha.push(tipo);


					}else{
						alert('defina a quantidade!!!')
					}
		}else{
			alert('Preencha todos os campos!!!');
		}//if para definir se há filtro
	}
	

	vm.filtrarProduto = function(tipo){	

		function filtrarProduto(value){
			if(value.tipo === tipo.filtro){
				return true;
			}
		}
			var array =  produtosService.get().filter(filtrarProduto);
			vm.produtos = array.sort(compareFiltro);
	}


	vm.salvarLacre = function(){
		vm.arrayEscolha.forEach(function(value){
			vm.arrayExibe.push(value);
		})

		vm.arrayEscolha = [];
		vm.lacre = null;
		vm.trm = null;
		vm.showLacre = true;
	}

	vm.salvar = function(){
			
		function testaView(){
			if(isEmpty(vm.agente) || isEmpty(vm.date) || isEmpty(vm.hora) || isEmpty(vm.bairro) || isEmpty(vm.logradouro)){
				
				return false;
			}
		
			return true;
		}

		function reseta(){
			vm.auto = null;
			vm.agente = null;
			vm.date = null;
			vm.hora = null;
			vm.bairro = null;
			vm.logradouro = null;
			vm.arrayExibe = [];
		}

		
		if(testaView()){
			var distinctLacre = []
			var arrayObjLacre = []
			vm.arrayExibe.forEach(function(value){
				if(distinctLacre.indexOf(value.lacre) === -1){
					distinctLacre.push(value.lacre);
					arrayObjLacre.push({numero: value.lacre});
				}
			})	

			arrayObjLacre.forEach(function(value){
				vm.arrayExibe.forEach(function(exibido){
					if(exibido.lacre === value.numero){
						if(!value['mercadoria']){
							value.mercadoria = [];
							value.mercadoria.push({produto: exibido.produto, quantidade: exibido.quantidade});						
							value.data = vm.date.replace('/', '').replace('/', '');
							value.auto = vm.auto;
							value.trm = exibido.trm;
							value.agente = vm.agente.nome;
							value.hora = vm.hora;
							value.bairro = vm.bairro.bairro;
							value.logradouro = vm.logradouro.logradouro;
							value.dataCadastro = new Date();
							value.agenteCadastro = $window.localStorage['usuario'];
							value.localCadastro = $window.localStorage['local'];
						}else{
							value.mercadoria.push({produto: exibido.produto, quantidade: exibido.quantidade});						
							value.data = vm.date.replace('/', '').replace('/', '');
							value.auto = vm.auto;
							value.trm = exibido.trm;
							value.agente = vm.agente.nome;
							value.hora = vm.hora;
							value.bairro = vm.bairro.bairro;
							value.logradouro = vm.logradouro.logradouro;
							value.dataCadastro = new Date();
							value.agenteCadastro = $window.localStorage['usuario'];
							value.localCadastro = $window.localStorage['local'];
						}	
					}
				})

				lacreService.salvar(value);
			})
			reseta();				
		}else{
			alert('Preencha todos os campos do formulário!');
		}
		
	}

	vm.validaHora = function(value){
		function valida(valor){
			var hora = valor.substring(0,2);
			var separador = valor.substring(2,3);
			var minutos = valor.substring(3,5);

			if(parseInt(hora) > 24){
				return false;
			}

			if(parseInt(minutos) > 59){
				return false;
			}

			if(separador !== ':'){
				return false;
			}

			return true;
		}

		if (value.length === 5){
			if(!valida(value)){
				alert('Hora mal formatada!!!');
				vm.hora = null;
			}
		}
		
	}

}]);

