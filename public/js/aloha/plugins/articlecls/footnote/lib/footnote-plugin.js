define([
        'aloha',
        'aloha/jquery',
        'aloha/plugin',
        'ui/ui',
        'ui/button',
        'util/dom',
        'PubSub',
        'i18n!footnote/nls/i18n',
        'i18n!aloha/nls/i18n',
        'css!footnote/css/footnote.css'
], function(
		Aloha,
		jQuery,
		Plugin,
		Ui,
		Button,
		Dom,
		PubSub,
		i18n,
		i18nCore) {
	"use strict";

	var pluginNamespace = 'footnote';

	return Plugin.create(pluginNamespace, {
		/**
		 * Default configuration allows links everywhere
		 */
		config : [ 'a' ],
		/**
		 * Internal update interval reference to work around an ExtJS bug
		 */
		hrefUpdateInt : null,
		/**
		 * HotKeys used for special actions
		 */
		hotKey : {
			insertFootnote : i18n.t('insertFootnote', 'ctrl+q')
		},
		/**
		 * Initializes the plugin.
		 */
		init : function() {
			this.createButtons();
			// this.enableHotkey(this);
		},

		enableHotkey : function(plugin) {
			PubSub.sub('aloha.editable.created', function(message) {
				var editable = message.editable;
				// enable hotkey for inserting links
				editable.obj.bind('keydown.aloha-link', plugin.hotKey.insertFootnote, function() {
					plugin.formatFootnote();
					return false;
				});
			});
		},

		nsSel : function() {
			var stringBuilder = [], prefix = pluginNamespace;
			jQuery.each(arguments, function() {
				stringBuilder.push('.' + (this == '' ? prefix : prefix + '-' + this));
			});
			return jQuery.trim(stringBuilder.join(' '));
		},

		// Creates string with this component's namepsace prefixed the each
		// classname
		nsClass : function() {
			var stringBuilder = [], prefix = pluginNamespace;
			jQuery.each(arguments, function() {
				stringBuilder.push(this == '' ? prefix : prefix + '-' + this);
			});
			return jQuery.trim(stringBuilder.join(' '));
		},

		/**
		 * Initialize the buttons
		 */
		createButtons : function() {
			var that = this;

			this._footnoteButton = Ui.adopt("footnote", Button, {
				tooltip : i18n.t("button.footnote.footnote"),
				icon : "aloha-icon-footnote",
				scope : 'Aloha.continuoustext',
				click : function() {
					that.formatFootnote();
				}
			});
		},

		/**
		 * Check whether inside a span.footnote tag
		 * 
		 * @param {RangeObject}
		 *            range range where to insert the object (at start or end)
		 * @return markup
		 * @hide
		 */
		findFootnoteMarkup : function(range) {
			if (typeof range == 'undefined') {
				range = Aloha.Selection.getRangeObject();
			}
			if (Aloha.activeEditable) {
				var limit = Aloha.activeEditable.obj;
				if (limit[0] && limit[0].nodeName === 'SPAN' && limit[0].classList.contains('footnote')) {
					limit = limit.parent();
				}
				return range.findMarkup(function() {
					return this.nodeName == 'SPAN' && this.classList.contains('footnote');
				}, limit);
			} else {
				return null;
			}
		},

		/**
		 * Format the current selection or if collapsed the current word as
		 * superscript. If inside a superscript tag the superscript is removed.
		 */
		formatFootnote : function() {
			if (Aloha.activeEditable) {
				if (this.findFootnoteMarkup(Aloha.Selection.getRangeObject())) {
					this.removeFootnote();
				} else {
					this.insertFootnote();
				}
			}
		},

		/**
		 * Insert a new link at the current selection. When the selection is
		 * collapsed, the link will have a default link text, otherwise the
		 * selected text will be the link text.
		 */
		insertFootnote : function(extendToWord) {
			var that = this, range = Aloha.Selection.getRangeObject(), footnoteText, newFootnote;
			// There are occasions where we do not get a valid range, in such
			// cases we should not try and add a footnote
			if (!(range.startContainer && range.endContainer)) {
				return;
			}
			// do not nest a footnote inside a footnote
			if (this.findFootnoteMarkup(range)) {
				return;
			}
			// if selection is collapsed then extend to the word.
			if (range.isCollapsed() && extendToWord !== false) {
				Dom.extendToWord(range);
			}
			if (range.isCollapsed()) {
				// insert a footnote with text here
				footnoteText = i18n.t('newfootnote.defaulttext');
				newFootnote = jQuery('<span class="footnote">' + footnoteText + '</span>');
				Dom.insertIntoDOM(newFootnote, range, jQuery(Aloha.activeEditable.obj));
				range.startContainer = range.endContainer = newFootnote.contents().get(0);
				range.startOffset = 0;
				range.endOffset = footnoteText.length;
			} else {
				newFootnote = jQuery('<span class="footnote"></span>');
				Dom.addMarkup(range, newFootnote, false);
			}
		},

		/**
		 * Remove a span.footnote tag
		 */
		removeFootnote : function(terminateLinkScope) {
			var range = Aloha.Selection.getRangeObject(), foundMarkup = this.findFootnoteMarkup();
			var linkText;
			// clear the current item from the href field
			// this.hrefField.setItem(null);
			if (foundMarkup) {
				linkText = jQuery(foundMarkup).text();
				// remove the link
				Dom.removeFromDOM(foundMarkup, range, true);
				range.startContainer = range.endContainer;
				range.startOffset = range.endOffset;
				// select the (possibly modified) range
				range.select();

			}
		}

	});

});