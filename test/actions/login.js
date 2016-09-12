import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const email = 'EMAIL'

const output = {
	account: 'ACCOUNT',
	accessLevel: 0,
	token: 'TOKEN',
	company: 'COMPANY'
}

const result = {
	accountId: 'ACCOUNT',
	id: 'TOKEN',
	user: {
		dutyId: 0,
		companyId: 'COMPANY'
	}
}

const data = {
	mail:'ACCOUNT',
	pwd:'PASSWORD'
}

describe('The action creator login', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "login",', () => {
    const store = mockStore({
      loggedUser: 0
    })
    nock(api + 'accounts/login')
      .post('?include=user')
      .reply(200, result)

    const expectedActions = [
      { type: 'waiting', operation: 'login' },
      { type: 'login', user: output}
    ]

    return store.dispatch(actions.login(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should be able to  create an action of type "error".', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
		nock(api + 'accounts/login')
      .post('?include=user')
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'login' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.login(email))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

describe('The action creator logout', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "logout",', () => {
		const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api + 'accounts/logout')
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(200, {})

    const expectedActions = [
      { type: 'waiting', operation: 'logout' },
      { type: 'logout'}
    ]

    return store.dispatch(actions.logout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should be able to  create an action of type "error".', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
		nock(api + 'accounts/logout')
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(404, {})

    const expectedActions = [
      { type: 'waiting', operation:'logout' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.logout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
