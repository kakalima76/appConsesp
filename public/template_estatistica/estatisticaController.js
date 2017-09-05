angular.module('app')
.controller('estatisticaController', ['anexoService', 'produtosService', '$window', function(anexoService, produtosService, $window){
	var vm = this;
	vm.mostrarLoading = false;
	vm.sub_estatisticas = 'templates/sub_estatistica.html';
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}

	vm.buscar = function(data){
			function compare(a,b) {
		  	if(a.produto < b.produto){
		  		return -1;
		  	}else if (a.produto > b.produto){
		  		return 1;
		  	}else{
		  		return 0;
		    }	 
		}
		
		if(!isEmpty(data)){
		vm.mostrarLoading = true;
		var data = data.replace(/(\/)+/g, '');
			var promise = anexoService.get(data);
			promise.then(function(dados){
				vm.mostrarLoading = false;
				var arrayDeProdutos = [];
				dados.data.forEach(function(value){
					value.mercadoria.forEach(function(obj){
						arrayDeProdutos.push(obj);
					})
				})

				var produtos = produtosService.get();
				arrayDeProdutos.forEach(function(produtoPesquisado){
					produtos.forEach(function(value){
						if(value.produto === produtoPesquisado.produto){
							produtoPesquisado.tipo = value.tipo;
						}
					})
				})


				arrayDeProdutos.forEach(function(value){
					var count = 0;
					arrayDeProdutos.forEach(function(obj){
						if(value.tipo === obj.tipo){
							count = count + obj.quantidade;
							value.total = count;
						}
					})
				})


				vm.estatisticas = [];

					var distinctLacre = []
					arrayDeProdutos.forEach(function(value){
						if(distinctLacre.indexOf(value.tipo) === -1){
							distinctLacre.push(value.tipo);
							vm.estatisticas.push({tipo: value.tipo, quantidade: value.total});
						}
					});	
			});

			promise.catch(function(){
				vm.mostrarLoading = false;
				alert('Problemas no anexoService');
			})


		}else{
			alert('Informe uma data!')
		}
	}


}]);