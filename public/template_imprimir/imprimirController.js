angular.module('app')
.controller('imprimirController',['$window', 'cadastroFactory', '$routeParams', 'consespService', function($window, cadastroFactory, $routeParams, consespService){
	var vm = this;
	var valor = 100;
	var local = 'LOCAL DE TESTE';

  
	var dataAtual = function(data){
		
		var dia = data.substring(8)
		var mes = parseInt(data.substring(5,7)) - 1;
		var ano = data.substring(0,4);

		var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  
		return dia + ' de ' + meses[mes] + ' de ' + ano + '.';
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
                {'funcao': 'Fiscal', 'valor': '80,00', 'extenso': '(oitenta reais)'},
                {'funcao': 'Fiscal Integral', 'valor': '160,00', 'extenso': '(cento e sessenta reais)'},
                {'funcao': 'Fiscal de Área', 'valor': '80,00', 'extenso': '(oitenta reais)'},
                {'funcao': 'Fiscal de Área Integral', 'valor': '160,00', 'extenso': '(cento e sessenta reais)'},
                {'funcao': 'Apoio', 'valor': '80,00', 'extenso': '(oitenta reais)'},
                {'funcao': 'Apoio Integral', 'valor': '160,00', 'extenso': '(cento e sessenta reais)'},
                {'funcao': 'Bombeiro Hidráulico', 'valor': '150,00', 'extenso': '(cento e cinquenta reais)'},
                {'funcao': 'Bombeiro Hidráulico Integral', 'valor': '300,00', 'extenso': '(trezentos reais)'},
                {'funcao': 'Fiscal Volante', 'valor': '80,00', 'extenso': '(oitenta reais)'},
                {'funcao': 'Fiscal Volante Integral', 'valor': '160,00', 'extenso': '(cento e sessenta reais)'},
                {'funcao': 'Coordenador', 'valor': '300,00', 'extenso': '(trezentos reais)'},
                {'funcao': 'Coordenador Integral', 'valor': '600,00', 'extenso': '(seiscentos reais)'}, 
                {'funcao': 'Auxiliar de Coordenação', 'valor': '150,00', 'extenso': '(cento e cinquenta reais)'},
                {'funcao': 'Auxiliar de Coordenação Integral', 'valor': '300,00', 'extenso': '(trezentos reais)'},
                {'funcao': 'Auxiliar', 'valor': '150,00', 'extenso': '(cento e cinquenta reais)'},
                {'funcao': 'Auxiliar Integral', 'valor': '300,00', 'extenso': '(trezentos reais)'}, 
                {'funcao': 'Administrador', 'valor': '280,00', 'extenso': '(duzentos e oitenta reais)'},
                {'funcao': 'Administrador Integral', 'valor': '560,00', 'extenso': '(quinhentos e sessenta reais)'},
                {'funcao': 'Chefe de Local', 'valor': 0},
                {'funcao': 'Chefe de Local Integral', 'valor': 0},
                {'funcao': 'Representante', 'valor': 0},
                {'funcao': 'Representante Integral', 'valor': 0},
                {'funcao': 'Eletricista', 'valor': '150,00', 'extenso': '(cento e cinquenta reais)'},
                {'funcao': 'Eletricista Integral', 'valor': '300,00', 'extenso': '(trezentos reais)'},
                {'funcao': 'Porteiro', 'valor': '80,00', 'extenso': '(oitenta reais)'},
                {'funcao': 'Porteiro Integral', 'valor': '160,00', 'extenso': '(cento e sessenta reais)'},
   				{'funcao': 'Interprete de libras', 'valor': '120,00', 'extenso': '(cento e vinte reais)'},
   				{'funcao': 'Interprete de libras Integral', 'valor': '240,00', 'extenso': '(duzentos e quarenta reais)'},
                {'funcao': 'Enfermeiro', 'valor': '120,00', 'extenso': '(cento e vinte reais)'},
                {'funcao': 'Enfermeiro Integral','valor': '240,00', 'extenso': '(duzentos e quarenta reais)'}
            ]

        var filtro = function(value){
            return value.funcao === valor;
        }

        var resp = vm.funcoes.filter(filtro);

        return resp[0].valor + resp[0].extenso;
    }


        var promise = consespService.getColaboradores();
        promise.then(function(array){
           var index = array.data.findIndex(i => i._id === $routeParams._id);
  
           vm.cadastro = array.data[index];
           vm.cadastro.local = $routeParams.local;
           vm.cadastro.funcao = $routeParams.funcao;
           vm.cadastro.data = $routeParams.data;
     
            vm.linha1 = 'Nome completo: ' + vm.cadastro.nome;
            vm.linha2 = 'Nasc.:  ' + data(vm.cadastro.nascimento) 
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
                vm.dataAtual = dataAtual(vm.cadastro.data);

                
            })


	
}]);