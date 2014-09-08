define([
    'aloha/plugin',
    'PubSub',
    'aloha',
    'block/blockmanager',
    'block/editormanager',
    'block/editor',
    'headerblock/block'
], function(Plugin, PubSub, Aloha, BlockManager, EditorManager, Editor,  Block) {
    "use strict";
    
    var MathJaxEditor = Editor.AbstractFormElementEditor.extend({
    	formInputElementDefinition : '<textarea placeholder="Your Math Functions" />'
    	// TODO extend Editor for Save Button? At the moment value changes when focus lost
	});
    
    
    var DateEditor = Editor.AbstractFormElementEditor.extend({
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
			BlockManager.registerBlockType('HeaderAuthorBlock', Block.HeaderAuthorBlock);
			BlockManager.registerBlockType('HeaderDateBlock', 	Block.HeaderDateBlock);
			BlockManager.registerBlockType('HeaderTitleBlock', 	Block.HeaderTitleBlock);
			BlockManager.registerBlockType('MathJaxBlock', 		Block.MathJaxBlock);
			

			EditorManager.register('date', 		DateEditor);
			EditorManager.register('mathjax', 	MathJaxEditor);
		},
	});
});