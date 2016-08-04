export default function companyRegistrationReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingCheckCompanyName':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'checkCompanyName'
			})
		case 'successCheckCompanyName':
			return Object.assign({}, state, {
				status: 
				{
					...status,
					loading: false,
					waitingFor: null,
					validity:
					{
						...validity,
						companyName: true
					}
				}
			})
		case 'failedCheckCompanyName':
			return Object.assign({}, state, {
				status: 
				{
					...status,
					loading: false,
					waitingFor: null,
					validity:
					{
						...validity,
						companyName: false
					}
				}
			})
		case 'waitingCompanyRegistration':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'companyRegistration'
			})
		case 'successCompanyRegistration':
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
		case 'failedCompanyRegistration':
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