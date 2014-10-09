web-publishing-chain
====================

This is an attempt to use [Aloha Editor](http://aloha-editor.org/) for the HTML/CSS representation 
with [Article.cls](http://wannesm.be/articlecls/) for single source publishing.

With this proof of concept prototype it is able to create content with a Article.cls template.

Extended Aloha Functionality is:

 - Footnote Plugin
 - Edit Header
 - Edit Authors (add and delete not implemented)
 - Edit Creation Date

Future work
--------------------

  - Provide elements for adding and removing specific blocks (authors, title, subtitle, ...)
  - Clear the temporary folders (/public/html_preview and /output)
  - eventually disable editable-highlighting (seems buggy with big sections)?
  - Provide save options for cloud services as Google Drive or DropBox
 

Installation and Usage
--------------------

Make sure you have installed [NodeJS](http://nodejs.org/) and [PrinceXML](http://www.princexml.com/), then run the following commands in the `web-publishing-chain` folder:

	npm install
	npm start

Open <http://localhost:3000> in your webbrowser, et voilà.

