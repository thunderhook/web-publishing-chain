define([ 'block/block', 'i18n!headerblock/nls/i18n' ], function(block, i18n) {

	/**
	 * Block for the Article.cls Header for author
	 */
	var HeaderTitleBlock = block.AbstractBlock.extend({
		title : i18n.t('headerblock.label.title'),
		getSchema : function() {
			return {
				'title' : {
					type : 'string',
					label : i18n.t('headerblock.label.title')
				}
			}
		},

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
		getSchema : function() {
			return {
				'author' : {
					type : 'string',
					label : i18n.t('headerblock.label.author')
				}
			}
		},

		update : function($element, postProcessFn) {
			// TODO only works with one author! Fix with finding the correct meta tag with old content
			$('meta[name=author]').attr('content', this.attr('author'));
			$element.html(this.attr('author'));
			postProcessFn();
		}
	});

	/**
	 * Block for the Article.cls Header for publishing date
	 */
	var HeaderDateBlock = block.AbstractBlock.extend({
		title : i18n.t('headerblock.label.date'),
		getSchema : function() {
			return {
				'date' : {
					type : 'date',
					label : i18n.t('headerblock.label.date')
				}
			}
		},

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

	return {
		HeaderTitleBlock : HeaderTitleBlock,
		HeaderAuthorBlock : HeaderAuthorBlock,
		HeaderDateBlock : HeaderDateBlock
	};
});