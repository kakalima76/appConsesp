angular.module('app')
.controller('escalaController', ['$window', 'consespService',function($window, consespService){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.colaboradores = [];
	var arrayDeColaboradores = [];
	vm.concursoAtual = {}

	var promise = consespService.getConcursos();
	promise.then(function(data){
		vm.opcoes = data.data;
	});


	vm.funcoes = 
	[
		{'funcao': 'Fiscal', 'valor': 0},
		{'funcao': 'Fiscal de Detector', 'valor': 0},
		{'funcao': 'Apoio', 'valor': 0},
		{'funcao': 'Bombeiro Hidráulico', 'valor': 0},
		{'funcao': 'Fiscal Volante', 'valor': 0},
		{'funcao': 'Fiscal', 'valor': 0},
		{'funcao': 'Coordenador', 'valor': 0}, 
		{'funcao': 'Auxiliar de Coordenação', 'valor': 0}, 
		{'funcao': 'Administrador', 'valor': 0},
		{'funcao': 'Chefe de Local', 'valor': 0},
		{'funcao': 'Representante', 'valor': 0},
		{'funcao': 'Eletricista', 'valor': 0} ,
		{'funcao': 'Porteiro', 'valor': 0},
		{'funcao': 'Interprete de libras', 'valor': 0}
	]

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

	//funcao para transformar a string de data da resposta em um data real
	var geraData = function(data){
		var data = data.substring(0,4) + '-' + data.substring(5,7) + '-' + data.substring(8,10);
		
	};


	vm.mudar = function(){
		vm.colaboradores = [];
	}

	vm.buscar = function(value){
	vm.colaboradores = [];

		if(value.data){
			var promiseColaboradores = consespService.getColaboradores();
			promiseColaboradores.then(function(data){
			
				data.data.forEach(function(cadastro){
					
					if(cadastro.concursos.length > 0){

						cadastro.concursos.forEach(function(concurso){

							if(concurso.nome !== value.nome){
								vm.colaboradores.push(cadastro);
							}
						})

					}else{
						vm.colaboradores.push(cadastro);
					}
						
				})

			});

		}else{
			$window.alert("Escolha um concurso.");
		}
		
	}


	
	vm.salvar = function(value){

		if(vm.funcao){

			var filtro = function(value){
				return value.escolhido
			}

			var resp = vm.colaboradores.filter(filtro);

			var array = [];

			resp.forEach(function(value){

				var obj = {}
				obj.cpf = value.cpf;
				obj.data = vm.concursoAtual.data;
				obj.periodo = vm.concursoAtual.periodo;
				obj.nome = vm.concursoAtual.nome;
				obj.funcao = vm.funcao.funcao;
				array.push(obj);
			})


			array.forEach(function(value){
				var promise = consespService.criarConcurso(value);
				promise.then(function(data){
					vm.colaboradores = {}
				})
			})
		
		}else{
			$window.alert("Selecione uma função");
		}//testando para ver se foi escolhida uma função
	}

	

}]);