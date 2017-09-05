angular.module('app')
.controller('anexoController',['anexoService', '$window', 'localService', function(anexoService, $window, localService){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];
	vm.locais = localService.get();
	
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}

	vm.sub_lacre = 'templates/sub_lacre.html';

		vm.buscar = function(data){
			function compare(a,b) {
		  	if(a.numero < b.numero){
		  		return -1;
		  	}else if (a.numero > b.numero){
		  		return 1;
		  	}else{
		  		return 0;
		    }	 
		}

			function filtroLocal(value){
				if(value.localCadastro === vm.localLacre){
					return true;
				}
			}
		
		if(!isEmpty(data) && !isEmpty(vm.localLacre)){
		vm.mostrarLoading = true;
		var data = data.replace(/(\/)+/g, '');
			var promise = anexoService.get(data);
			promise.then(function(dados){
				vm.mostrarLoading = false;
				if(vm.localLacre === 'TODOS'){
					vm.lacres = dados.data.sort(compare);
				}else{
					var response = dados.data.filter(filtroLocal);
					vm.lacres = response.sort(compare);
				}
				
			});

			promise.catch(function(){
				vm.mostrarLoading = false;
				alert('Problemas no anexoService');
			})


		}else{
			alert('Informe uma data e local!')
		}
	}
}]);