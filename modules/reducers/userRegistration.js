export default function userRegistrationReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingCheckUsername':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'checkUsername'
			})
		case 'successCheckUsername':
			return Object.assign({}, state, {
				status: 
				{
					...status,
					loading: false,
					waitingFor: '',
					result: 'success',
					error: null, //potenzialmente non vero
					validity:
					{
						...validity,
						username: true
					}
				}
			})
		case 'failedCheckUsername':
			return Object.assign({}, state, {
				status: 
				{
					...status,
					loading: false,
					waitingFor: '',
					result: 'failed',
					error: null,
					validity:
					{
						...validity,
						username: false
					}
				}
			})
		case 'waitingUserRegistration':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'userRegistration'
			})
		case 'successUserRegistration':
			return Object.assign({}, state, {
				status: 
				{
					...status,
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
				}
			})
		case 'failedUserRegistration':
			return Object.assign({}, state, {
				status: 
				{
					...status,
					loading: false,
					waitingFor: null,
					result: 'error',
					error: action.error
				}
			})
		default:
			return state
	}
}