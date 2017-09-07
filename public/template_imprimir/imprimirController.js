angular.module('app')
.controller('imprimirController',['$window', 'cadastroFactory', function($window, cadastroFactory){
	var vm = this;
	var valor = 100;
	var local = 'LOCAL DE TESTE';


	var dataAtual = function(){
		var dt = new Date();
		var dia = dt.getDate();
		var mes = dt.getMonth();
		var ano = dt.getFullYear();

		var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  
		return '07 de setembro de 2017.'
	}

	var genero = function(sexo){
		if(sexo === false){
			return 'Feminino';
		}

		return 'Masculino';
	}

	var data = function(data){
		return data.substring(8,10) + '/' + data.substring(5,7) + '/' + data.substring(0,4)
	}


    var pagamento = function(valor){
         vm.funcoes = 
            [
                {'funcao': 'Fiscal', 'valor': 80, 'extenso': '(oitenta reais)'},
                {'funcao': 'Fiscal de Detector', 'valor': 80, 'extenso': '(oitenta reais)'},
                {'funcao': 'Apoio', 'valor': 80, 'extenso': '(oitenta reais)'},
                {'funcao': 'Bombeiro Hidráulico', 'valor': 300, 'extenso': '(trezentos reais)'},
                {'funcao': 'Fiscal Volante', 'valor': 80, 'extenso': '(oitenta reais)'},
                {'funcao': 'Coordenador', 'valor': 600, 'extenso': '(seiscentos reais)'}, 
                {'funcao': 'Auxiliar de Coordenação', 'valor': 300, 'extenso': '(trezentos reais)'}, 
                {'funcao': 'Administrador', 'valor': 560, 'extenso': '(quinhentos e sessenta reais)'},
                {'funcao': 'Chefe de Local', 'valor': 0},
                {'funcao': 'Representante', 'valor': 0},
                {'funcao': 'Eletricista', 'valor': 300, 'extenso': '(trezentos reais)'} ,
                {'funcao': 'Porteiro', 'valor': 80, 'extenso': '(oitenta reais)'},
                {'funcao': 'Interprete de libras', 'valor': 0}
            ]

        var filtro = function(value){
            return value.funcao === valor;
        }

        var resp = vm.funcoes.filter(filtro);

        return resp[0].valor + resp[0].extenso;
    }


		vm.cadastro = cadastroFactory.get();
		

		vm.linha1 = 'Nome completo: ' + vm.cadastro.nome;
		vm.linha2 = 'Data de nascimento:  ' + data(vm.cadastro.nascimento) 
										    + '   Sexo:   ' + genero(vm.cadastro.sexo)
										    + '   Identidade:   ' + vm.cadastro.idt
										    + '   Órgão expeditor:  ' + vm.cadastro.emissor
										    + '   Data de expedição: ' + data(vm.cadastro.dataEmissao);
        vm.linha3 = 'CPF: ' + vm.cadastro.cpf
        					+ ' PIS/PASEP: ' + vm.cadastro.pispasep
        					+ ' Estado civil: ' + vm.cadastro.estadoCivil;

        vm.linha4 = 'Endereço: ' + vm.cadastro.endereco;
        vm.linha5 = 'Bairro: '  + vm.cadastro.bairro
        						+ ' Cidade: ' + vm.cadastro.municipio
        						+ ' CEP: ' + vm.cadastro.cep
        						+ ' UF: ' + vm.cadastro.uf;


        

        vm.linha6 = 'Contato:' + vm.cadastro.contato + ' E-mail: ' + vm.cadastro.email; 

	        vm.pagamento = 'Recebi da CONSESP - CONSULTORIA EM CONCURSOS E PESQUISAS SOCIAIS, empresa inscrita no CNPJ  sob o número ';
	        vm.pagamento += ' 07.056.558/0001-38⁠⁠⁠⁠, a importância líquida de  R$ ' +  pagamento(vm.cadastro.funcao);
	        vm.pagamento += ' por serviços prestados de ' + vm.cadastro.funcao
	        vm.pagamento += ' do exame da(o) ' +  vm.cadastro.local + '.';

	        vm.declaracao = 'O signatário da presente, abaixo qualificado, declara, ';
	        vm.declaracao += ' sob as penas da lei, que não possui qualquer grau de ';
	        vm.declaracao += ' parentesco em até terceiro grau, seja por consanguinidade ou ';
	        vm.declaracao += ' por afinidade, com os membros do(a) ' + vm.cadastro.local ;
	        vm.declaracao += ' e com os canditados inscritos no certame, bem como não ministra';
	        vm.declaracao += ' aulas em cursos preparatórios relativos ao processo em questão'  + '.';

	        vm.dataAtual = dataAtual();

	    setTimeout(function(){
	    	$window.print();
	    },20);
		

}]);