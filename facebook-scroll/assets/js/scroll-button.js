var scroller = {
	init: function( options ) {
		scroller.config = {
			debugMode: 1, // 1 to show console messages 0 to hide
			btnId: '#facebook-scroll-to-top-button', // css id for the button
			btnTxt: '&uarr;', // txt for the button
			duration: 500, // duration of the button animation (milliseconds)
		};

		$.extend( scroller.config, options );

		scroller.btn_insert();
		scroller.btn_hide();
		scroller.btn_monitor();
		scroller.register_click();
	},

	debug: function ( msg ) {
		if ( console && console.debug && scroller.config.debugMode >= 1)
			console.debug( msg );
	},

	extend: function ( options ) {
		$.extend ( scroller.config, options );
	},

	register_click: function() {
		$(scroller.config.btnId).click( function() {
			window.scrollTo(0,0);
			scroller.btn_hide();
		});
	},

	// injects the scroll button into the dom
	btn_insert: function () {
		$('body').prepend('<div id="' + scroller.config.btnId.replace('#', '') + '"><p>' + scroller.config.btnTxt + '</p></div>');
	},

	// sets the offset of the button so it's visible
	btn_show: function () {
		$(scroller.config.btnId).animate({
			right: 0
		}, scroller.config.duration);

		scroller.visible = true;
	},

	// sets the offset of the button so it's hidden
	btn_hide: function() {
		$(scroller.config.btnId).animate({
			right: '-' + $(scroller.config.btnId).outerWidth()
		}, scroller.config.duration);

		scroller.visible = false;
	},

	// monitors scrolling and hides / shows the button as appropriate
	btn_monitor: function() {
		$(window).scroll( function () {
			if ( scrollY > 100 && !scroller.visible)
				scroller.btn_show();

			if ( scrollY < 50 && scroller.visible)
				scroller.btn_hide();
		});
	}
}

$( document ).ready( scroller.init() );
