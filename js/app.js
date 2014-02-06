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
        initPromo();
    }


    /**
     *  hides the promo if cookie is set
     */
    function initPromo() {

        var hidePromoCookieName = 'bnb_showpromo';

        var hidePromo = getCookie(hidePromoCookieName) || false;

        if(hidePromo) {
            var promo = document.getElementById('promo');
            if(promo) {
                promo.style.display = "none";
            }
        } else {

            // js available => show promo code on same page
            registerEventlistener('show-promo-info', 'click', function(e)   {
                if(e.preventDefault) e.preventDefault();
                var promoInfo = document.getElementById('promo-info');
                var promoTeaser = document.getElementById('promo-teaser');
                
                if(promoTeaser) {
                    promoTeaser.style.display = "none";
                }
                if(promoInfo) {
                    promoInfo.style.display = "block";
                }
                return false;
            });
            
            // js is available => show the close buttons
            var promolinks = document.querySelectorAll('.promo-links');
            for(var i=0; i < promolinks.length; i++) {
                if(promolinks[i]) {
                    promolinks[i].style.display = "block";
                }
            }

            /* register eventlistener for close */
            registerEventlistener('promo-close', 'click', function(e) {
                if(e.preventDefault) e.preventDefault();
                document.getElementById('promo').style.display = "none";
                return false;
            });

            /* register eventlistener for close and hide - not shown again for 1 day */
            registerEventlistener('promo-closehide', 'click', function(e) {
                if(e.preventDefault) e.preventDefault();
                setCookie(hidePromoCookieName, true, 1);
                document.getElementById('promo').style.display = "none";
                return false;
            });

        }
    }

    /**
     *  registers an eventlistener to elements with given classname
     *
     *  @param classname        classname of elements to bind eventlistener
     *  @param event            name of event to bind listener to
     *  @param cb               callback
     *
     */
    function registerEventlistener(classname, event, cb) {
        var elements = document.querySelectorAll('.'+classname);

        for(var i=0; i < elements.length; i++) {
            if(elements[i]) {
                if(!elements[i].addEventListener) {
                    elements[i].attachEvent('on'+event, cb);
                } else {
                    elements[i].addEventListener(event, cb);
                }
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


