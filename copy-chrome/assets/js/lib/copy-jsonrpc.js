var copy = {
	init: function( options ) {
		copy.config = {
			cloudAddress: 'http://api.copy.lithium/jsonrpc',
			debugMode: 1, // 1 to show console messages 0 to hide
		};

		$.extend( copy.config, options );
	},

	debug: function ( msg ) {
		if ( console && console.debug && copy.config.debugMode >= 1)
			console.debug( msg );
	},

	extend: function ( options ) {
		$.extend ( copy.config, options );
	},

	apiRequest: function ( method, params ) {
		copy.debug( 'making api request to ' + method + ' with params ' + JSON.stringify(params) );

		params = {
			'jsonrpc': '2.0',
			'method': method,
			'id': Math.random().toString(36).substring(2,8),
			'params': params,
		};

		$.ajax({
			dataType: 'json',
			data: JSON.stringify(params),
			headers: {
				'X-Client-Type': 'api',
				'X-Api-Version': '1.0',
			},
			type: 'POST',
			url: copy.config.cloudAddress,
		})
		.done( function( data, textStatus, jqXHR ) {
			return data;
		})
		.fail( function ( jqXHR, textStatus, errorThrown ) {
			return false;
		});
	},

	login: function ( email, password ) {
		var user = copy.apiRequest('auth_user', { 'username': email, 'password': password });

		if (!user) {
			delete user;
			return false;
		}

		copy.user = {
			'first_name': user.first_name,
			'last_name': user.last_name,
		};
	}
}

$( document ).ready( copy.init() );
