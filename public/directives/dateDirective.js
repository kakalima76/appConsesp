angular.module('app').directive('datepicker', function() {
  return {
    restrict: 'A',
    require : 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
    	$.datepicker.regional['pt-BR'] = {
			closeText: 'Fechar',
			prevText: '&lt;Anterior',
			nextText: 'Próximo&gt;',
			currentText: 'Hoje',
			monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
			'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
			monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
			'Jul','Ago','Set','Out','Nov','Dez'],
			dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
			dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
			dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
			weekHeader: 'Sm',
			dateFormat: 'dd/mm/yy',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};

		$.datepicker.setDefaults($.datepicker.regional['pt-BR']);

	    $(element).datepicker().on('changeDate', function(e) {
	        ngModelCtrl.$setViewValue(e.date);
	        scope.$apply();
	    });
    }
  };
});