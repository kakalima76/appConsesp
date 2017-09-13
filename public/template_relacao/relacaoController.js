angular.module('app')
.controller('relacaoController', ['cadastroFactory', '$window', 'consespService', '$scope', '$route', '$location', '$filter', function(cadastroFactory, $window, consespService, $scope, $route, $location, $filter){
	var vm = this;

	function compareNome(a,b) {
	  	if(a.nome < b.nome){
	  		return -1;
	  	}else if (a.nome > b.nome){
	  		return 1;
	  	}else{
	  		return 0;
	    }	 
	}

	vm.colaboradores = cadastroFactory.get();
	vm.colaboradores.forEach(i => i.funcao = i.funcao.replace("Integral", ""));
	vm.colaboradores.forEach(i => i.nome = $filter('lowercase')(i.nome));
	vm.colaboradores.sort(compareNome);
	
	

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	

}]);