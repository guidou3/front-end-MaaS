import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const id = 'ID'

const result = {
	  id:'ID',
	  name:'NAME',
		code:'CODE',
		databaseId:'DATABASE'
}

describe('The action creator getDSLI', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "getDSLI",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api + 'dsl/'+ id+ '/getCode')
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(200, result)

    const expectedActions = [
      { type: 'waiting', operation: 'getDSLI' },
      { type: 'getDSLI', dsli: result}
    ]

    return store.dispatch(actions.getDSLI(id))
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
		nock(api + 'dsl/'+id+ '/getCode' )
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'getDSLI' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.getDSLI(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
