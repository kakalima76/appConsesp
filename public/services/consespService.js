
angular.module('app')

.service('consespService', ['$http', function($http){


	var getConcursos = function(){
		return $http.get('https://restconsesp.herokuapp.com/cadastro/listarNomeConcursos');
	}

	var getColaboradores = function(){
		return $http.get('https://restconsesp.herokuapp.com/cadastro/listarCadastro');
	}


	var setColaborador = function(obj){
		return $http.post('https://restconsesp.herokuapp.com/cadastro/criarCadastro', obj)
	}

	var setConcurso = function(obj){
		return $http.post('https://restconsesp.herokuapp.com/cadastro/criarNomeConcurso', obj)
	}

	var criarConcurso = function(obj){
		return $http.post('https://restconsesp.herokuapp.com/cadastro/criarConcurso', obj)
	}

	var removerConcurso = function(obj){
		return $http.post('https://restconsesp.herokuapp.com/cadastro/removerConcurso', obj)
	}

		

	return {
		getConcursos: getConcursos,
		getColaboradores: getColaboradores,
		setColaborador: setColaborador,
		setConcurso: setConcurso,
		criarConcurso: criarConcurso,
		removerConcurso: removerConcurso
		}

}])