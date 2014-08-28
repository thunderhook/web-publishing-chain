web-publishing-chain
====================

This is an attempt to use [Aloha Editor](http://aloha-editor.org/) for the HTML/CSS representation 
with [Article.cls](http://wannesm.be/articlecls/) for single source publishing

TODO
--------------------

 - [x] Fix behaviour of Alohas .mahalo() function. Doesn't clear Aloha classes.
    - [ ] eventually disable editable-highlighting (seems buggy with big sections)?
 - [x] Check existing Aloha plugins and load the one needed.
 - [ ] Write own Aloha Plugins
     - [ ] Footnote Plugin
     - [ ] Cite Plugin (check existing aloha plugin first)
     - [ ] ...
 - [ ] Implement header functionality in control panel (paper title, author, ...)
     - [ ] block plugin? 



Installation and Usage
--------------------

Make sure you have installed [NodeJS](http://nodejs.org/), then run the following commands in the `web-publishing-chain` folder:

	npm install
	npm start

Open <http://localhost:3000> in your webbrowser, et voilà.

