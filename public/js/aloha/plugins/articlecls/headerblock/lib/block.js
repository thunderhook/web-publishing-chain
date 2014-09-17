define([
        'block/block',
        'i18n!headerblock/nls/i18n'
], function(
		block,
		i18n
) {

	/**
	 * Block for the Article.cls Header for author
	 */
	var HeaderTitleBlock = block.AbstractBlock.extend({
		title : i18n.t('headerblock.label.title'),
		
		/**
		 * Schema for data-title
		 */
		getSchema : function() {
			return {
				'title' : {
					type : 'string',
					label : i18n.t('headerblock.label.title')
				}
			}
		},
		
		/**
		 * Init function for setting the original content to the editor
		 */
		init: function ($element, postProcessFn) {
			$element.attr('data-title', $element.text());
			postProcessFn();
		},

		/**
		 * Update title tag
		 */
		update : function($element, postProcessFn) {
			document.title = this.attr('title');
			$element.html(this.attr('title'));
			postProcessFn();
		}
	});

	/**
	 * Block for the Article.cls Header for author
	 */
	var HeaderAuthorBlock = block.AbstractBlock.extend({
		title : i18n.t('headerblock.label.author'),
		
		/**
		 * Schema for author-data
		 */
		getSchema : function() {
			return {
				'author' : {
					type : 'string',
					label : i18n.t('headerblock.label.author')
				}
			}
		},
		
		/**
		 * Init function for setting the original content to the editor
		 */
		init: function ($element, postProcessFn) {
			$element.attr('data-author', $element.text());
			postProcessFn();
		},

		/**
		 * Find Meta Tags for authors and set them
		 */
		update : function($element, postProcessFn) {
			var currentAuthor = $('meta[name=author]').get($('span[class~="aloha-block-HeaderAuthorBlock"]').index($element));
			$(currentAuthor).attr('content', this.attr('author'));
			$element.html(this.attr('author'));
			postProcessFn();
		}
	});

	/**
	 * Block for the Article.cls Header for publishing date
	 */
	var HeaderDateBlock = block.AbstractBlock.extend({
		title : i18n.t('headerblock.label.date'),
		
		/**
		 * Schema for date-data
		 */
		getSchema : function() {
			return {
				'date' : {
					type : 'date',
					label : i18n.t('headerblock.label.date')
				}
			}
		},

		/**
		 * Init function for setting the original content to the editor
		 */
		init: function ($element, postProcessFn) {
			$element.attr('data-date', $element.attr('dateTime'));
			postProcessFn();
		},
		
		/**
		 * Update the given date, check for date syntax and set date in Article.cls style
		 */
		update : function($element, postProcessFn) {
			var date = this.attr('date');
			$('meta[name="dcterms.issued"]').attr('content', date);
			$element.attr('datetime', date);

			// borrowed from articlecls.js
			var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			var fields = date.match(/(\d+)/g);
			if (fields != null) {
				if (fields.length < 3) {
					fields[2] = 0;
					if (fields.length < 2) {
						fields[1] = 0;
					}
				}
				date = new Date(fields[0], fields[1] - 1, fields[2]);
				$element.html(months[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear());
			}
			postProcessFn();
		}
	});
	
	/**
	 * Block for MathJax
	 */
	var MathJaxBlock = block.AbstractBlock.extend({
		title : i18n.t('headerblock.label.mathjax'),
		getSchema : function() {
			return {
				'mathjax' : {
					type : 'mathjax',
					label : i18n.t('headerblock.label.mathjax')
				}
			}
		},

		update : function($element, postProcessFn) {
			// TODO fully implement
			// TODO block vs. inline MathJax?
			$element.html('$$' + this.attr('mathjax') + '$$');
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			postProcessFn();
		}
	});

	return {
		HeaderTitleBlock : HeaderTitleBlock,
		HeaderAuthorBlock : HeaderAuthorBlock,
		HeaderDateBlock : HeaderDateBlock,
		MathJaxBlock : MathJaxBlock
	};
});