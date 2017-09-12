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


	String.prototype.extenso = function(c){
    var ex = [
        ["zero", "um", "dois", "tr?s", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinq?enta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ["mil", "milh?o", "bilh?o", "trilh?o", "quadrilh?o", "quintilh?o", "sextilh?o", "setilh?o", "octilh?o", "nonilh?o", "decilh?o", "undecilh?o", "dodecilh?o", "tredecilh?o", "quatrodecilh?o", "quindecilh?o", "sedecilh?o", "septendecilh?o", "octencilh?o", "nonencilh?o"]
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
        if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
        for(a = -1, l = v.length; ++a < l; t = ""){
            if(!(i = v[a] * 1)) continue;
            i % 100 < 20 && (t += ex[0][i % 100]) ||
            i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
            ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("?o", "?es") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}

		
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
	
		{'funcao': 'Fiscal de Área', 'valor': 0},
		
		{'funcao': 'Enfermeiro', 'valor': 0},
		
		{'funcao': 'Apoio', 'valor': 0},
		
		{'funcao': 'Bombeiro Hidráulico', 'valor': 0},
	
		{'funcao': 'Fiscal Volante', 'valor': 0},
	
		{'funcao': 'Fiscal', 'valor': 0},
	
		{'funcao': 'Coordenador', 'valor': 0}, 
		
		{'funcao': 'Auxiliar de Coordenação', 'valor': 0},
		
		{'funcao': 'Auxiliar', 'valor': 0}, 
		
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

				
				if(vm.concursoAtual.periodo === 'Integral'){
					obj.funcao = vm.funcao.funcao + ' Integral';
					console.log(obj);
				}else{
					obj.funcao = vm.funcao.funcao;
				}

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