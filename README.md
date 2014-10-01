web-publishing-chain
====================

This is an attempt to use [Aloha Editor](http://aloha-editor.org/) for the HTML/CSS representation 
with [Article.cls](http://wannesm.be/articlecls/) for single source publishing.

With this proof of concept prototype it is able to create content with a Article.cls template.

Extended Aloha Functionality is:

 - Footnote Plugin
 - Edit Header
 - Edit Authors (adding not implemented)
 - Edit Creation Date

TODO
--------------------

 - [x] Fix behaviour of Alohas .mahalo() function. Doesn't clear Aloha classes.
    - [ ] eventually disable editable-highlighting (seems buggy with big sections)?
 - [x] Check existing Aloha plugins and load the one needed.
 - [x] Write own Aloha Plugins
     - [x] Footnote Plugin
 - [x] Implement header functionality in control panel (paper title, author, ...)
     - [x] block plugin? 
     - [x] fix author block plugin (only one author possible at the moment)


Future work
--------------------

  - Provide elements for adding and removing specific blocks (authors, title, subtitle, ...)
  - Clear the temporary folders (/public/html_preview and /output)
 

Installation and Usage
--------------------

Make sure you have installed [NodeJS](http://nodejs.org/) and [PrinceXML](http://www.princexml.com/), then run the following commands in the `web-publishing-chain` folder:

	npm install
	npm start

Open <http://localhost:3000> in your webbrowser, et voilà.

