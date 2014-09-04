web-publishing-chain
====================

This is an attempt to use [Aloha Editor](http://aloha-editor.org/) for the HTML/CSS representation 
with [Article.cls](http://wannesm.be/articlecls/) for single source publishing.

TODO
--------------------

 - [x] Fix behaviour of Alohas .mahalo() function. Doesn't clear Aloha classes.
    - [ ] eventually disable editable-highlighting (seems buggy with big sections)?
 - [x] Check existing Aloha plugins and load the one needed.
 - [ ] Write own Aloha Plugins
     - [x] Footnote Plugin
         - [ ] multiple JS-reloadings generate multiple footnotes: rewrite article.cls?
     - [ ] Cite Plugin
     - [ ] ...
 - [x] Implement header functionality in control panel (paper title, author, ...)
     - [x] block plugin? 
     - [ ] fix author block plugin (only one author possible at the moment)



Installation and Usage
--------------------

Make sure you have installed [NodeJS](http://nodejs.org/), then run the following commands in the `web-publishing-chain` folder:

	npm install
	npm start

Open <http://localhost:3000> in your webbrowser, et voilà.

