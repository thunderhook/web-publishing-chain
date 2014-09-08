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
		errorhandling : false,
		locale : 'de',
		plugins : {
			link : {
				target : "_blank",
				objectTypeFilter : [ "language/link" ]
			},
			block : {
				defaults : {
					'hgroup div span.name' : {
						'aloha-block-type' : 'HeaderAuthorBlock'
					},
					'hgroup time' : {
						'aloha-block-type' : 'HeaderDateBlock'
					},
					'hgroup h1' : {
						'aloha-block-type' : 'HeaderTitleBlock'
					},
					'.mathjax-input' : {
						'aloha-block-type' : 'MathJaxBlock'
					}
				},
				dragdrop : false,
				rootTags : [ 'span', 'div', 'time', 'h1' ]
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