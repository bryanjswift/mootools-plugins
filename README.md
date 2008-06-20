Plugins for MooTools
====================

This is a space to keep some various utilities and plugins I've written or helped write based on the [mootools-core](http://github.com/mootools/mootools-core). They are not fully supported or even fully tested at this point but I needed a place to put them while I ported them from 1.11 (in some cases) and 1.2b (in most cases).

### Documentation

I'm including at the root of this project the files I will be using to display my markdown documentation.
* .htaccess - Contains the apache mod_rewrite rules being used to send files through the php file which is calling the markdown engine
* markup.php - Basic shell for calling the Markdown text processor
* markdown.php - Slightly modified version of [PHP Markdown Extra](http://michelf.com/projects/php-markdown/extra/)

### Demos

The Demos folder contains a copy of the mootools-core 1.2 yuicompressed for use by the demo files. When it's available I'll change the demos to use a file hosted by [Google](http://code.google.com/apis/ajaxlibs/) but for now this'll have to do.

Additionally I plan to create some sort of useful demos section on my website but this is all down the road. If only I could do this full time rather than having a job.

Fx.Position
-----------

The first of a number of Classes I built to extend MooTools. This is a fairly simplistic class whose primary function is
to center elements on a page.