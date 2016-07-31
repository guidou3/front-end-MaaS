export default function companiesReducer(state = 0, action) {
	switch (action.type) {
    case 'RECEIVED_COMPANIES':
      return action.companies
    default:
      return state
  }
}
