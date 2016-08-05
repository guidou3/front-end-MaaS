export default function companyRegistrationReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingCheckCompanyName':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'checkCompanyName',
				validity:
				{
					companyName: false
				}
			})
		case 'successCheckCompanyName':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					validity:
					{
						companyName: true
					}
			})
		case 'failedCheckCompanyName':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					validity:
					{
						companyName: false
					}
			})
		case 'waitingCompanyRegistration':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'companyRegistration'
			})
		case 'successCompanyRegistration':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedCompanyRegistration':
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
