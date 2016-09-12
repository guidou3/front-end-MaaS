import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const result = [
	{
	  id:'ID',
	  tag:'TAG'
	},
	{
	  id:'ID1',
	  tag:'TAG1'
	},
	{
	  id:'ID2',
	  tag:'TAG2'
	}
]

describe('The action creator getDatabase', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "getDatabase",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api + 'companies/'+ store.getState().loggedUser.company+'/databases')
      .get('?access_token=' + store.getState().loggedUser.token)
      .reply(200, result)

    const expectedActions = [
      { type: 'waiting', operation: 'getDatabase' },
      { type: 'getDatabase', listData: result}
    ]

    return store.dispatch(actions.getDatabase())
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
		nock(api + 'companies/'+ store.getState().loggedUser.company+'/databases')
      .get('?access_token=' + store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'getDatabase' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.getDatabase())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
