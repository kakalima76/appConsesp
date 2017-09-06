angular.module('app')
.controller('cadastroController',['$window', 'cpfService', 'cepService', function($window, cpfService, cepService){
	var vm = this;
	vm.cadastro = {}
	vm.user = $window.localStorage['usuario'];
	vm.opcoes = [{'sexo': 'Feminino', 'codigo': 1}, {'sexo': 'Masculino', 'codigo': 0}]
	vm.estadoCivil = ['casado(a)', 'solteiro(a)', 'noivo(a)', 'divorciado(a)', 'viuvo(a)', 'unido(a)']


	vm.alertaCPF= function(cpf){
		console.log(cpfService.validaCPF(cpf))
		if(!cpfService.validaCPF(cpf)){
			vm.cadastro.cpf = 'cpf invalido';
		}
	}

	vm.alertaPIS= function(pis){
		console.log(cpfService.validaPIS(pis))
		if(!cpfService.validaPIS(pis)){
			vm.cadastro.pispasep = 'pis/pasep invalido';
		}
	}

	
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}


	vm.buscarCep = function(cep){
		var promise = cepService.get(cep);
		promise.then(function(data){
			
			vm.cadastro.bairro = data.data.bairro;
			vm.cadastro.municipio = data.data.localidade;
			vm.cadastro.endereco = data.data.logradouro;
			vm.cadastro.uf = data.data.uf;

			console.log(vm.cadastro);

		})
	}

	vm.salvar = function(obj){

		vm.cadastro.sexo = obj.sexo.codigo;
		console.log(obj)
	}


}]);