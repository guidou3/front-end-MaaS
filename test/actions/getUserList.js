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
		account:'ID',
	  company:'COMPANY',
		accessLevel:0
	},
	{
		account:'ID1',
	  company:'COMPANY',
		accessLevel:1
	},
	{
		account:'ID2',
	  company:'COMPANY',
		accessLevel:0
	}
]

describe('The action creator getUserList', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "getUserList",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api + 'companies/'+ store.getState().loggedUser.company+'/users')
      .get('?access_token=' + store.getState().loggedUser.token)
      .reply(200, result)

    const expectedActions = [
      { type: 'waiting', operation: 'getUserList' },
      { type: 'getUserList', userList: result}
    ]

    return store.dispatch(actions.getUserList())
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
		nock(api + 'companies/'+ store.getState().loggedUser.company+'/users')
      .get('?access_token=' + store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'getUserList' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.getUserList())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
