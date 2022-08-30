# jQuery Plugin for Requesting Ajax-like File Downloads

POSTED BY SCOTT JEHL 03/02/2009. Original source from https://github.com/filamentgroup/jQuery-File-Download/. (Archived/deprecated on 8/30/2022.)

**April 2020 note:** Hi! Just a quick note to say that this post is pretty old, and might contain outdated advice or links. We're keeping it online, but recommend that you check newer posts to see if there's a better approach.

**August 2022 note:** This project has been forked from [filamentgroup](https://github.com/filamentgroup/jQuery-File-Download/) and updated to support `target`.

Ajax has changed the way we build web apps, allowing rich communication between the client and server without any need to refresh the page. But despite its power and flexibility, Ajax has numerous shortcomings such as a same-domain request policy and the inability to receive data without polling the server. For these limitations, we've seen workarounds such as JSONP and Comet.

One issue we have not yet seen addressed is the Ajax's inability to receive a response in any form but text. Since it is now common for web applications to offer options for exporting your data in desktop app formats — such as .doc or .xls — we wrote a jQuery plugin to facilitate requests from the front end that result in a file for download. The plugin does not actually use Ajax, but its syntax follows the conventions of jQuery's native Ajax functions, making it a natural addition to our jQuery toolset.

## The Problem
Let's take the example of a productivity web app such as a spreadsheet editor, which has the ability to open, save, import and export. The open and save options would involve loading a spreadsheet from the database, whereas import and export deal with local files on the user's machine. To implement the export behavior, you might decide that the user should have to save their spreadsheet first, allowing you to export the data from the backend to file. But let's assume instead you'd like to allow users to export their data without saving, perhaps to afford them the option of working locally without ever storing data on the server. In order to do this, you'd need to send the current spreadsheet data to the backend and receive a file to download. Unfortunately, this can not be handled using Ajax, since Ajax can only receive responses in the form of text. In cases where the data to be saved is rather lengthy, this poses a considerable problem.

## The Workaround
In order to make the request, you'd need to make a regular (not Ajax) HTTP request using GET or POST. If the data is reasonably short, you might get away with a GET request (perhaps by simply setting Window.location to your export url), but due to varying browser limitations on GET request length, a POST will most likely be needed. The following plugin allows you to make a request that returns a file in a similar syntax to jQuery's native Ajax functions.

## The Source Code

```js
jQuery.download = function(url, data, method, target){
    if (typeof target === 'undefined') { target = ''; }
    //url and data options required
    if( url && data ){
        //data can be string of parameters or array/object
        data = typeof data == 'string' ? data : jQuery.param(data);
        //split params into form inputs
        var inputs = '';
        jQuery.each(data.split('&'), function(){
            var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
        });
        //send request
        jQuery('<form action="'+ url +'" method="'+ (method||'post') +'" target="'+ target +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};
```

### How to Use It
Usage is simple. The plugin accepts 4 arguments for `url`, `data`, `method` and `target`. You can pass data to these arguments just as you would to jQuery's $.post or $.get functions, and assuming the server has no problems handling the request, the front end will respond with a prompt for a file download and the user never needs to leave the page. Here's an example call to the plugin:

```js
$.download('/export.php','filename=mySpreadsheet&format=xls&content=' + spreadsheetData );
```

As you can see, we've directed the request to the `export.php` file via the url argument, and our data argument is a key/value query string. Just like jQuery's Ajax functions, the data argument accepts either query parameters or a Javascript array or object. The method argument represents the HTTP method being used, and it defaults to `'post'`. You can override this argument with `'get'` depending on what your server is set up to receive.

## Download (and help us improve) the code
This code is open source and available in a git repository, [jQuery-File-Download](https://github.com/JamoCA/jQuery-File-Download). If you think you can help on a particular issue, please submit a pull request and we'll review it as soon as possible.

## A Word of Caution
Since this plugin simply appends an HTML form to the page and submits it, you do run the risk of sending the user to a new page. This could occur if the server responds with anything other than a file for download (such as an error condition), so you'll want to take that into account when using this plugin.
