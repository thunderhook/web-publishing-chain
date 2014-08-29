(function(window, undefined) {
	var Aloha = window.Aloha || (window.Aloha = {});
	Aloha.settings = {
		_pluginBaseUrlByName : '.',
		logLevels : {
			'error' : true,
			'warn' : true,
			'info' : true,
			'debug' : false,
			'deprecated' : true
		},
		sidebar : {
			disabled : true
		},
		errorhandling : false,
		ribbon : false,
		locale : 'de',
		plugins : {
			format : {
				// all elements with no specific configuration get this
				// configuration
				config : [ 'b', 'i', 'p', 'sub', 'sup', 'del', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat' ],
				editables : {
				// no formatting allowed for title
				// '#top-text' : []
				}
			}
		},
		toolbar : {
			tabs : [ {
				label : 'Article.cls',
				showOn : {
					scope : 'Aloha.continuoustext'
				},
				components : [ [ 'footnote' ] ]
			} ]
		}
	};
})(window);