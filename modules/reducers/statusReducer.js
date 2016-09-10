/*
* Name : statusReducer.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-13     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
export default function statusReducer(state = 0, action) {
switch(action.type) {
	case 'initialize':
	case '@@router/LOCATION_CHANGE':
	case 'persist/REHYDRATE':
		return {
			loading: false,
			waitingFor: null,
			result: null,
			error: null
		}
	case 'waiting':
		return  Object.assign({}, state, {
			loading: true,
			waitingFor: action.operation,
			result: null,
			error: null
		})
  case 'error':
		return Object.assign({}, state, {
				loading: false,
				waitingFor: null,
				result: 'error',
				error: action.error
		})

	case 'changeAccessLevel':
	case 'changeDSLIPermits':
	case 'changeImage':
	case 'changePassword':
	case 'cloneDSLI':
	case 'support':
	case 'companyRegistration':
	case 'deleteDSLI':
	case 'deleteUser':
	case 'deleteData':
	case 'embodyUser':
	case 'getDSLI':
	case 'getDSLIList':
	case 'login':
	case 'newDSLI':
	case 'saveTextDSLI':
	case 'sendResetMail':
	case 'userRegistration':
	case 'addDatabase':
	case 'setAccessLevel':
	case 'getDatabase':
		return Object.assign({}, state, {
				loading: false,
				waitingFor: null,
				result: 'success',
				error: null
		})
	case 'checkUsername':
		return Object.assign({}, state, {
				loading: false,
				waitingFor: null,
				result: 'success',
				error: null, //potenzialmente non vero
				usernameValidity: true
		})
	case 'checkCompanyName':
		return Object.assign({}, state, {
				loading: false,
				waitingFor: null,
				result: 'success',
				error: null,
				companyNameValidity: true
		})
	case 'failedCheckCompanyName':
		return Object.assign({}, state, {
				loading: false,
				waitingFor: null,
				result: 'failed',
				error: null,
				companyNameValidity: false
		})
	case 'failedCheckUsername':
		return Object.assign({}, state, {
				loading: false,
				waitingFor: null,
				result: 'failed',
				error: null,
				usernameValidity: false
		})

	case 'embodyUser':
	case 'logout':
		return 0
	default:
		return state
	}
}
