angular.module('app')
.controller('cadastroController',['$window', 'cpfService', 'cepService', 'consespService', function($window, cpfService, cepService, consespService){
	var vm = this;
	vm.cadastro = {}
	vm.user = $window.localStorage['usuario'];
	vm.opcoes = [{'sexo': 'Feminino', 'codigo': 1}, {'sexo': 'Masculino', 'codigo': 0}]
	vm.estadoCivil = ['casado(a)', 'solteiro(a)', 'noivo(a)', 'divorciado(a)', 'viuvo(a)', 'unido(a)']


	vm.alertaCPF= function(cpf){
		if(!isEmpty(cpf)){
			if(!cpfService.validaCPF(cpf)){
				vm.cadastro.cpf = 'cpf invalido';
			}
		}
	}

	vm.alertaPIS= function(pis){
		if(!isEmpty(pis)){
			if(!cpfService.validaPIS(pis)){
			vm.cadastro.pispasep = 'pis/pasep invalido';
			}
		}
	}

	
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	var formataCPF = function(cpf){
		cpf = cpf.replace(/[^\d]+/g, '');
		cpf = cpf.substring(0,3) + '.' + cpf.substring(3,6) + '.' + cpf.substring(6,9) + '-' + cpf.substring(9); 
		return cpf;
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

		})
	}

	vm.salvar = function(obj){

		if(cpfService.validaCPF(obj.cpf) && cpfService.validaPIS(obj.pispasep)){

			if(!obj.sexo){
				obj.sexo = 0;
			}

			if(!isEmpty(obj.cpf) && !isEmpty(obj.pispasep) && !isEmpty(obj.nome))
			{
				if(isEmpty(obj.dataEmissao)){
					obj.dataEmissao = '2017-01-01';
				}

				if(isEmpty(obj.nascimento)){
					obj.nascimento = '2017-01-01';
				}

				vm.cadastro.sexo = obj.sexo.codigo;

				obj.cpf = formataCPF(vm.cadastro.cpf);
				
				var promise = consespService.setColaborador(obj);
				promise
				.then(function(data){
				$window.alert('Ok');
				vm.cadastro = {}
				})

				.catch(function(err){
					$window.alert(err);
					console.log(err);
				})

				vm.cadastro = {}

			}else{
				$window.alert('Preencha os três primeiros campos do formulário!')
			}
			

	}else{
		$window.alert('CPF e PIS/PASEP válidos são requeridos');
	}

}

}]);