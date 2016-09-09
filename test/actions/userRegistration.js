import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://mass-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const data = {
	email: 'MAIL',
	companyName: 'COMPANY',
	password: 'PASSWORD',
	dutyId: 0,
	subscribedAt: 'DATE',
	emailVerified: false
}

describe('The action creator checkUsername', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "successCheckUsername",', () => {
    const store = mockStore({ })
    nock(api + 'accounts/'+ data.email+'/exists')
      .get('')
      .reply(200, {exists: false})

    const expectedActions = [
      { type: 'waiting', operation: 'checkUsername' },
      { type: 'successCheckUsername' },
      { type: 'waiting', operation: 'userRegistration'}
    ]

    return store.dispatch(actions.checkUsername(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

	it('should be able to create an action of type "failedCheckUsername",', () => {
    const store = mockStore({ })
    nock(api + 'accounts/'+ data.email+'/exists')
      .get('')
      .reply(200, {exists: true})

    const expectedActions = [
      { type: 'waiting', operation: 'checkUsername' },
      { type: 'failedCheckUsername' }
    ]

    return store.dispatch(actions.checkUsername(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should be able to  create an action of type "error".', () => {
    const store = mockStore({ })
		nock(api + 'accounts/'+ data.email+'/exists')
      .get('')
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'checkUsername' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.checkUsername(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

const registrationResult = {
	id:'ID'
}

describe('The action creator userRegistration:', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('should be able to  create an action of type "userRegistration",', () => {
    nock(api + 'companies/'+ data.companyName +'/users')
      .post('')
      .reply(200, registrationResult)

    const expectedActions = [
      { type: 'waiting', operation:'userRegistration' },
      { type: 'userRegistration', user: registrationResult },

    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.userRegistration(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })


  it('should be able to  create an action of type "error".', () => {
		nock(api + 'companies/'+ data.companyName +'/users')
      .post('')
      .reply(404, {})

    const expectedActions = [
      { type: 'waiting', operation:'userRegistration' },
      { type: 'error', error:404 }
    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.userRegistration(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
