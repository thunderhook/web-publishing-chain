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
		// sidebar : {
		// disabled : true
		// },
		errorhandling : false,
		ribbon : false,
		locale : 'de',
		plugins : {
			link : {
				target : "_blank",
				objectTypeFilter : [ "language/link" ]
			},
			block : {
				// TODO set jQuery selector, that it only searches for elements
				// in <hgroup>
				defaults : {
					'hgroup div span.name' : {
						'aloha-block-type' : 'HeaderAuthorBlock'
					},
					'hgroup time' : {
						'aloha-block-type' : 'HeaderDateBlock'
					},
					'hgroup h1' : {
						'aloha-block-type' : 'HeaderTitleBlock'
					}
				},
				dragdrop : false,
				rootTags : [ 'span', 'div', 'time', 'h1' ]
			}
		}

	};
})(window);