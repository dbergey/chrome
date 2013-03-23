var copy = {
	init: function( options ) {
		copy.config = {
			cloudAddress: 'http://api.dev.copy.com/jsonrpc',
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

		try
		{
			apiResultXhr = $.ajax({
				async: false, // TODO: when an async method is need ad an array and check for existance
				dataType: 'json',
				data: JSON.stringify(params),
				headers: {
					'X-Client-Type': 'api',
					'X-Api-Version': '1.0',
				},
				type: 'POST',
				url: copy.config.cloudAddress,
			})
			.fail( function( jqXHR, textStatus, thrownError ) {
				copy.debug( textStatus );
				copy.debug( jqXHR );
			})
			.always( function( data ) {
				if (data.id != params.id)
					throw new Error('Return id does not match request id');
			});
		}
		catch (e)
		{
			copy.debug(e.name + ': ' + e.message);
		}

		return apiResultXhr;
	},

	login: function ( email, password ) {
		copy.apiRequest(
			'auth_user',
			{
				'username': email,
				'password': password
			}
		)
		.done( function( data, textStatus, jqXHR ) {
			/*copy.user = {
				'first_name': data.first_name,
				'last_name': data.last_name,
			};*/
		});
	}
}

$( document ).ready( copy.init() );
