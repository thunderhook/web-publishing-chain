define([
    'aloha/plugin',
    'PubSub',
    'aloha',
    'block/blockmanager',
    'block/editormanager',
    'block/editor',
    'headerblock/block'
], function(Plugin, PubSub, Aloha, BlockManager, EditorManager, editor,  block) {
    "use strict";
    

    var DateEditor = editor.AbstractFormElementEditor.extend({
    	formInputElementDefinition : '<input type="text" placeholder="yyyy-MM-dd"/>',
		getValue: function () {
			var date = this._$formInputElement.val();
			var dateRegex = new RegExp(/^\d{4}\-\d{1,2}\-\d{1,2}$/);
			if (dateRegex.test(date)) {
				return date;
			} else {
				alert('Invalid date format. Only yyyy-MM-dd permitted.');
				return null;
			}
		}
	});
    

    return Plugin.create('headerblock', {
		init : function() {
			BlockManager.registerBlockType('HeaderAuthorBlock', block.HeaderAuthorBlock);
			BlockManager.registerBlockType('HeaderDateBlock', block.HeaderDateBlock);
			BlockManager.registerBlockType('HeaderTitleBlock', block.HeaderTitleBlock);

			EditorManager.register('date', DateEditor);
		},
	});
});