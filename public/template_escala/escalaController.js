angular.module('app')
.controller('escalaController', ['$window', 'consespService', '$filter',  function($window, consespService, $filter){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.colaboradores = [];
	var arrayDeColaboradores = [];
	vm.concursoAtual = {}
	var arrayDeConcursos = [];

	var promise = consespService.getConcursos();
	promise.then(function(data){
		vm.opcoes = data.data;

		//utilizada para criar uma forma de evitar que
		//um candidato já selecionado apareça novamente
		//para ser escolhido
		vm.opcoes.forEach(function(concurso){
		var obj = {}
		obj.nome = concurso.nome;
		obj.data = concurso.data;
		arrayDeConcursos.push(obj);
		})

	});


	
	var equals = function( x, y ) {
    // If both x and y are null or undefined and exactly the same
    if ( x === y ) {
        return true;
    }

    // If they are not strictly equal, they both need to be Objects
    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
        return false;
    }

    // They must have the exact same prototype chain, the closest we can do is
    // test the constructor.
    if ( x.constructor !== y.constructor ) {
        return false;
    }

    for ( var p in x ) {
        // Inherited properties were tested using x.constructor === y.constructor
        if ( x.hasOwnProperty( p ) ) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined
            if ( ! y.hasOwnProperty( p ) ) {
                return false;
            }

            // If they have the same strict value or identity then they are equal
            if ( x[ p ] === y[ p ] ) {
                continue;
            }

            // Numbers, Strings, Functions, Booleans must be strictly equal
            if ( typeof( x[ p ] ) !== "object" ) {
                return false;
            }

            // Objects and Arrays must be tested recursively
            if ( !equals( x[ p ],  y[ p ] ) ) {
                return false;
            }
        }
    }

    for ( p in y ) {
        // allows x[ p ] to be set to undefined
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
            return false;
        }
    }
    return true;
}

	
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
				
				data.data.forEach(function(cadastro, index){
					cadastro.nome = $filter('uppercase')(cadastro.nome);
					var index = cadastro.concursos.findIndex(i => i.nome === value.nome);
					if(index === -1)
					{
						vm.colaboradores.push(cadastro);
						vm.colaboradores.sort(compareNome);
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