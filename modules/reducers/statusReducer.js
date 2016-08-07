export default function statusReducer(state = 0, action) {
	switch(action.type) {
		case 'waiting':
			return  {
				loading: true,
				waitingFor: action.operation,
				result: null,
				error: null
			}
    case 'error':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'error',
					error: action.error
			})

    case 'successChangeImage':
    case 'successChangePassword':
    case 'successCloneDSLI':
    case 'successCompanyRegistration':
    case 'successDeleteDSLI':
    case 'successDeleteUser':
    case 'successNewDSLI':
    case 'successRenameDSLI':
    case 'successSaveTextDSLI':
    case 'successUserRegistration':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})

		case 'waitingCheckUsername':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'checkUsername',
				validity:
				{
					username: false
				}
			})
    case 'waitingCheckCompanyName':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'checkCompanyName',
				validity:
				{
					companyName: false
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
		default:
			return state
	}
}
