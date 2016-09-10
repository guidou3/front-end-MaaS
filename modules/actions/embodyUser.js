/*
* Name : embodyUser.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-17     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
export function requestEmbodyUser() {
	return {
		type: 'waiting',
		operation: 'embodyUser'
	}
}

export function receiveEmbodyUser(bool, data) {
	if(bool) return {
		type: 'embodyUser',
		user: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function embodyUser(json) {
	return function(dispatch){
		dispatch(requestEmbodyUser())
		/*return request
			.get('url1')
			.then(
				function(result){
          if(result.password == json.password)
          {
            dispatch(receiveLogin(true, result))
          }
          else
          {
            dispatch(receiveLogin(false, 'Password sbagliata'))
          }
				},
				function(error){
					dispatch(receiveLogin(false, error))
				}
			)*/
			return request
				.get('url1')
				.auth(json.username, json.password, {type:'auto'})
				.then(
					function(result){
	          dispatch(receiveEmbodyUser(true, result))
					},
					function(error){
						dispatch(receiveEmbodyUser(false, error))
					}
				)
	}
}
