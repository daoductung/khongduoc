/******************************/
/********* docReady ***********/
/******************************/

/**
 * docReady function
 *
 * pass a function reference
 * docReady(fn);
 *
 * use an anonymous function
 * docReady(function() { // code here});
 *
 * pass a function reference and a context
 * the context will be passed to the function as the first argument
 * docReady(fn, context);
 *
 * use an anonymous function with a context
 * docReady(function(ctx) {// code here that can use the context argument that was passed to docReady}, context);
 *
 * @param {type} funcName
 * @param {type} baseObj
 * @returns {undefined}
 */
(function (funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function (callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function () {
                callback(context);
            }, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        // IE only safe when readyState is "complete", others safe when readyState is "interactive"
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);

/********************************************/
/***************** Chatbot SDK ******************/
/********************************************/

var BoxChat = function () {
    var baseURL = '';
    var constants = {
        URL: {
            IFRAME_CHAT: '/chatbox?bid='
        },
        ID: {
            BOT_PLATFORM: "botplatform_iframe",
            SCRIPT_PLATFORM: "platform-script"
        },
    };

    var initIframe = function () {
        var src             = document.getElementById("platform-script").getAttribute("src");
        baseURL             = 'http://' + src.replace('http://','').replace('https://','').split(/[/?#]/)[0];
        var bid             = document.getElementById(constants.ID.SCRIPT_PLATFORM).getAttribute("data-bid");

        // add iframe
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", baseURL + constants.URL.IFRAME_CHAT + bid);
        ifrm.frameborder = 0;
        ifrm.scrolling = "no";
        ifrm.style = "right: 0px; left: auto; border: 0px; position: fixed; bottom: 0px; top: auto; z-index: 9999;";
        ifrm.id = constants.ID.BOT_PLATFORM;
        document.body.appendChild(ifrm);

    };

    var bindEventsForElement = function () {
        window.addEventListener('message', handleEvent, false);
    };

    function handleEvent(e) {
        var elm = document.getElementById(constants.ID.BOT_PLATFORM);
        elm.style.height = e.data.height;
        elm.style.width = e.data.width;
        elm.style.transition = e.data.transition;
    }
    return {
        init : function(){
            initIframe();
            bindEventsForElement();
        }
    };
}();

docReady(function () {
    BoxChat.init();
});