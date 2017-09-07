
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

	var setStatusConcurso = function(obj){
		return $http.post('https://restconsesp.herokuapp.com/cadastro/atualizarEscalado', obj)
	}

	return {
		getConcursos: getConcursos,
		getColaboradores: getColaboradores,
		setColaborador: setColaborador,
		setConcurso: setConcurso,
		setStatusConcurso: setStatusConcurso
	}

}])