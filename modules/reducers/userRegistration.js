export default function userRegistrationReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingCheckUsername':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'checkUsername',
				validity:
				{
					username: false
				}
			})
		case 'successCheckUsername':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: '',
					result: 'success',
					error: null, //potenzialmente non vero
					validity:
					{
						username: true
					}
			})
		case 'failedCheckUsername':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: '',
					result: 'failed',
					error: null,
					validity:
					{
						username: false
					}
			})
		case 'waitingUserRegistration':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'userRegistration'
			})
		case 'successUserRegistration':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedUserRegistration':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'error',
					error: action.error
			})
		default:
			return state
	}
}
