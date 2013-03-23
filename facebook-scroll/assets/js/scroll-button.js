var scroller = {
	init: function( options ) {
		scroller.config = {
			debugMode: 1, // 1 to show console messages 0 to hide
		};

		$.extend( scroller.config, options );
	},

	debug: function ( msg ) {
		if ( console && console.debug && scroller.config.debugMode >= 1)
			console.debug( msg );
	},

	extend: function ( options ) {
		$.extend ( scroller.config, options );
	}

}

$( document ).ready( scroller.init() );
