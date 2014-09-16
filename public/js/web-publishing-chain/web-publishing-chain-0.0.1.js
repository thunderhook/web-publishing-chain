uploadToServer = function() {
	var data = {};
	var html = document.documentElement.innerHTML;
	data.htmlContent = clearHtmlFile(html);
	$.ajax({
		type : 'POST',
		data : JSON.stringify(data),
		contentType : "application/json",
		// TODO relative link
		url : 'http://localhost:3000/expose/edit/save',
		success : function(data, textStatus, jqXHR) {
			var result = JSON.parse(jqXHR.responseText);
			// TODO For multiple uploads take an existing iframe and reuse it
			// TODO After Downloading, Aloha does not work!? Check
			document.body.innerHTML += "<iframe src='http://localhost:3000/download/" + result.filename + "' style='display: none;' ></iframe>"
		},
		error : {
			// TODO error handling
		}
	});
};


clearHtmlFile = function(html) {

	// Remove all script tags
	var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	while (SCRIPT_REGEX.test(html)) {
		html = html.replace(SCRIPT_REGEX, "");
	}

	// Relink all relative CSS includes
	var dom = $('<html/>').append($(html));
	dom.find("link").each(function() {
		var href = $(this).attr('href');
		// only relative links and stylesheets
		if (!/^https?:\/\//i.test(href) && $(this).attr('rel') == 'stylesheet') {
			$(this).attr('href', href.replace('/css', '/public/css'));
		}
	});

	// Remove Control Panel
	dom.find(".control-panel").remove();

	// Remove Aloha UI Helpers
	dom.find('link[href*="aloha.css"]').remove();
	dom.find(".aloha-ui").remove();
	dom.find("#aloha-ui-context").remove();
	dom.find(".aloha-toolbar").remove();
	dom.find(".aloha-character-picker-overlay").remove();
	// this is for empty div helpers from aloha without css-class
	dom.find("div:empty:not([class])").remove();

	var out = $('<html>').append(dom.clone()).html();
	return '<!DOCTYPE html><html>' + dom.html() + '</html>';
}