angular.module('app')
.controller('concursoController', ['$window', 'consespService', '$filter', function($window, consespService, $filter){
	var vm = this;
	vm.concurso = {}
	vm.opcoesPeriodo = ['Manhã', 'Tarde', 'Integral'];
	vm.empresas = [{nome: 'CONSESP - CONSULTORIA EM CONCURSOS E PESQUISAS SOCIAIS', cnpj: '07.056.558/0001-38'}]
	vm.user = $window.localStorage['usuario'];
	vm.myDate = new Date();
  	vm.isOpen = false;
	
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

	vm.upperNome = function(){
		vm.concurso.nome = $filter('uppercase')(vm.concurso.nome);
	}

	vm.salvar = function(value){

		if 
		(
			!isEmpty(value.nome) &&
			!isEmpty(value.data) &&
			!isEmpty(value.periodo) &&
			!isEmpty(value.empresa) &&
			!isEmpty(value.quantidade) 
		)
			{
				value.data = value.data.substring(6) + '-' + value.data.substring(3,5) + '-' + value.data.substring(0,2);
				value.nome = value.nome + '/' + value.data.substring(0,4) + ' - ' + value.periodo;
				value.cnpj = value.empresa.cnpj;
				value.empresa = value.empresa.nome;

		
				var promise = consespService.setConcurso(value);
				promise
				.then(function(data){
					$window.alert('Ok');
					vm.concurso = {};
				})

				.catch(function(err){
					console.log(err);
				})
			}else{
				$window.alert('Preencha todos os campos!!')
			}

		

		
		
	
	}

}]);

