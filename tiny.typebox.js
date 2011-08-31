/**
 * tiny.TypeBox
 *  - Find the right font for any website. _Now even easier!_
 *
 * This is a bookmarklet.
 * More info on http://tiny.typebox.info (perhaps). 
 *
 * by Karl Svartholm & Passion is Mandatory 2011-08-26 
 */

// TODO Make it possible to pass the parameter autostart is possible

function tinytypebox_next_family() {
    var header_family = tinytypebox_families[tinytypebox_family_index];
    var body_family = tinytypebox_families[tinytypebox_family_index+1];

    WebFontConfig = {
        google: { families: [header_family, body_family] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
  
    $('h1,h2,h3,h4,h5,h6').css('font-family', '\'' + header_family.split(':')[0] + '\'');
    $('body').css('font-family', '\'' + body_family.split(':')[0] + '\'');

    $('#tinytypebox-next').html('Current: ' + header_family + ' & ' + body_family);
    /* XXX Dirty hack to prevent the text to disapear behind the scrollbar */
    $('#tinytypebox-next').css('padding-right', 22);
	
    tinytypebox_family_index += 2;
    if (tinytypebox_families[tinytypebox_family_index] == undefined) {
        tinytypebox_family_index = 0;
    }
}

function tinytypebox_inject_self(attach_to) {
	tinytypebox_load_jquery();
	tinytypebox_load_self(attach_to, 0);
}

function tinytypebox_load_jquery() {
	document.body.appendChild(document.createElement('script')).src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js';
}

function tinytypebox_load_self(attach_to, time_elapsed) {
	if (typeof $ == 'undefined') {
		if (time_elapsed >= 5000) { alert('Sorry, failed to load jQuery. Complain to karl@passionismandatory.com if you want.'); return false; };
		setTimeout(function () { tinytypebox_load_self(attach_to, time_elapsed + 500); }, 500);
		return;
	}

	var code = $('<a id=\'tinytypebox-next\' style=\'position: fixed; bottom: 0; right: 0; z-index:10001; padding: 0 0.5em; border: 2px solid #ddd; background: #eee;\' href=\'javascript:tinytypebox_next_family();\'>Next font</a>');
	if (typeof attach_to != 'undefined' && attach_to) {
		if ($('#'+attach_to).length) {
			$('#'+attach_to).append(code);
		}
	} else {
    	$('body').append(code);
    }
}

if (tinytypebox_loaded == undefined) {
	var tinytypebox_loaded = true;	
	var tinytypebox_family_index = 0;
	var tinytypebox_families = [
	    'Lobster', 'Cabin',
	    'Ubuntu', 'Vollkorn',
	    'Raleway:100', 'Goudy Bookletter 1911',
	    'Allerta', 'Crimson Text',
	    'Arvo', 'PT Sans',
	    'Dancing Script', 'Josefin Sans',
	    'Allan:bold', 'Cardo',
	    'Molengo', 'Lekton',
	    'Droid Serif', 'Droid Sans',
	    'Corben:bold', 'Nobile'
	];

	if (typeof document.body != 'undefined' && document.body) {
		/* Assume bookmarklet mode */
		tinytypebox_inject_self();
	} else {
		/* Assume inclusion from html */
		var tinytypebox_old_onload = function() {};
		if (typeof window.onload == 'function') {
			tinytypebox_old_onload = window.onload;
		}
		window.onload = function() {
			tinytypebox_old_onload();
			tinytypebox_inject_self('tinytypebox');
		}
	}
}