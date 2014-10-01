generatePdf = function() {
	var data = {};
	var html = document.documentElement.innerHTML;
	data.htmlContent = clearHtmlFile(html, true);
	$.ajax({
		type : 'POST',
		data : JSON.stringify(data),
		contentType : "application/json",
		url : '/expose/edit/save/pdf',
		success : function(data, textStatus, jqXHR) {
			var result = JSON.parse(jqXHR.responseText);

			$('#download_iframe').remove();
			$('<iframe />', {
				id : 'download_iframe',
				src : 'http://localhost:3000/pdf/' + result.filename,
				style : 'display: none'
			}).appendTo('body');

		},
		error : {
			// TODO error handling
		}
	});
};

generateHtml = function() {
	var data = {};
	var html = document.documentElement.innerHTML;
	data.htmlContent = clearHtmlFile(html, false);
	$.ajax({
		type : 'POST',
		data : JSON.stringify(data),
		contentType : "application/json",
		url : '/expose/edit/save/html',
		success : function(data, textStatus, jqXHR) {
			var result = JSON.parse(jqXHR.responseText);

			window.open('/html/' + result.filename, 'HTML preview', '');

		},
		error : {
			// TODO error handling
		}
	});
};

clearHtmlFile = function(html, relinkCssForPdf) {
	// Remove all script tags
	var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	while (SCRIPT_REGEX.test(html)) {
		html = html.replace(SCRIPT_REGEX, "");
	}

	// Relink all relative CSS includes
	var dom = $('<html/>').append($(html));
	if (relinkCssForPdf) {
		dom.find("link").each(function() {
			var href = $(this).attr('href');
			// only relative links and stylesheets
			if (!/^https?:\/\//i.test(href) && $(this).attr('rel') == 'stylesheet') {
				$(this).attr('href', href.replace('/css', '/public/css'));
			}
		});
	}

	
	// workaround, since mahalo() does not work. set contenteditable to false.
	dom.find('section').attr('contenteditable', 'false');
	// this does not work: dom.find('section').mahalo();

	// Remove download iframe
	dom.find('#download_iframe').remove();

	// Remove Control Panel
	dom.find(".control-panel").remove();

	// Remove Aloha UI Helpers
	dom.find('link[href*="aloha.css"]').remove();
	dom.find(".aloha-ui").remove();
	dom.find("#aloha-ui-context").remove();
	dom.find(".aloha-toolbar").remove();
	dom.find(".aloha-character-picker-overlay").remove();
	
	dom.find("[class^='aloha-']").removeClass (function (index, css) {
	    return (css.match (/(^|\s)aloha-\S+/g) || []).join(' ');
	});

	// this is for empty div helpers from aloha without css-class
	dom.find("div:empty:not([class])").remove();

	var out = $('<html>').append(dom.clone()).html();
	return '<!DOCTYPE html><html>' + dom.html() + '</html>';
}