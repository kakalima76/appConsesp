angular.module('app')
.factory('timestampInterceptor', [function(){
	return {
		request: function(config){
			var url = config.url;
			if(url.indexOf('autos') > -1){return config;}
			if(url.indexOf('lacres') > -1){return config;}
			if(url.indexOf('anexos') > -1){return config;}
			if(url.indexOf('estatisticas') > -1){return config;}
			if(url.indexOf('header') > -1){return config;}
			var timestamp = new Date().getTime();
			config.url = url + "?timestamp=" + timestamp;
			return config;
		}
	}
}])