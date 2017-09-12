angular.module('app')
.service('cpfService', ['$http', function($http){

	var validaCPF = function(strCPF) {
    var strCPF = strCPF.replace(/[^\d]+/g, '');
    var Soma;
    var Resto;
    Soma = 0;
	if (strCPF == "00000000000") return false;
    
	for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
	
	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

	
	var validaPIS = function (pis) {
    var multiplicadorBase = "3298765432";
    var total = 0;
    var resto = 0;
    var multiplicando = 0;
    var multiplicador = 0;
    var digito = 99;
    
    // Retira a mascara
    var numeroPIS = pis.replace(/[^\d]+/g, '');

    if (numeroPIS.length !== 11 || 
        numeroPIS === "00000000000" || 
        numeroPIS === "11111111111" || 
        numeroPIS === "22222222222" || 
        numeroPIS === "33333333333" || 
        numeroPIS === "44444444444" || 
        numeroPIS === "55555555555" || 
        numeroPIS === "66666666666" || 
        numeroPIS === "77777777777" || 
        numeroPIS === "88888888888" || 
        numeroPIS === "99999999999") {
        return false;
    } else {
        for (var i = 0; i < 10; i++) {
            multiplicando = parseInt( numeroPIS.substring( i, i + 1 ) );
            multiplicador = parseInt( multiplicadorBase.substring( i, i + 1 ) );
            total += multiplicando * multiplicador;
        }

        resto = 11 - total % 11;
        resto = resto === 10 || resto === 11 ? 0 : resto;

        digito = parseInt("" + numeroPIS.charAt(10));
        return resto === digito;
    }
}


	return {
		validaCPF: validaCPF,
		validaPIS: validaPIS
	}

	
}])