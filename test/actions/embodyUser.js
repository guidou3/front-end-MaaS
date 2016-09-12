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
	account: 'ACCOUNT1',
	accessLevel: 0,
	token: 'TOKEN1',
	company: 'COMPANY'
}

const result = {
	accountId: 'ACCOUNT1',
	id: 'TOKEN1',
	user: {
		dutyId: 0,
		companyId: 'COMPANY'
	}
}

describe('The action creator embodyUser', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "login",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:9,
        account:'ACCOUNT',
        token:'TOKEN'
      }
    })
    nock(api + 'accounts/'+ email + '/impersonate')
      .post('?include=user&access_token=' + store.getState().loggedUser.token)
      .reply(200, result)

    const expectedActions = [
      { type: 'waiting', operation: 'embodyUser' },
      { type: 'login', user: output}
    ]

    return store.dispatch(actions.embodyUser(email))
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
		nock(api + 'accounts/'+ email + '/impersonate')
      .post('?include=user&access_token=' + store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'embodyUser' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.embodyUser(email))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
