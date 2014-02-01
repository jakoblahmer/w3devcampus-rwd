

(function() {

    // wait for document being loaded
    if(document.loaded) {
        init();
    } else {
        if (window.addEventListener) {  
            window.addEventListener('load', init, false);
        } else {
            window.attachEvent('onload', init);
        }
    }


    /**
     *  init function, called when document is ready
     */
    function init() {
        // hide promo stuff
        hidePromo();
    }


    /**
     *  hides the promo if cookie is set
     */
    function hidePromo() {

        var hidePromoCookieName = 'bnb_showpromo';

        var hidePromo = getCookie(hidePromoCookieName) || false;

        if(hidePromo) {
            document.getElementById('promo').style.display = "none";
        } else {

            /* register eventlistener for close */
            registerEventlistener('promo-close', 'click', function(e) {
                document.getElementById('promo').style.display = "none";
            });

            /* register eventlistener for close and hide - not shown again for 1 day */
            registerEventlistener('promo-closehide', 'click', function(e) {
                setCookie(hidePromoCookieName, true, 1);
                document.getElementById('promo').style.display = "none";
            });

        }
    }

    function registerEventlistener(classname, event, cb) {
        var elements = document.getElementsByClassName(classname);

        for(var i=0; i < elements.length; i++) {
            if(elements[i]) {
                elements[i].addEventListener(event, cb);
            }
        }

    }

    /** set and get cookie
     *  see http://www.w3schools.com/js/js_cookies.asp
     */
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function getCookie(cname)   {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)  {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return null;
    }
})();