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
	  name:'NAME',
		code:'CODE',
		databaseId:'DATABASE'
	},
	{
		id:'ID1',
	  name:'NAME1',
		code:'CODE1',
		databaseId:'DATABASE1'
	},
	{
		id:'ID2',
	  name:'NAME2',
		code:'CODE2',
		databaseId:'DATABASE2'
	}
]

describe('The action creator getDSLIList', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "getDSLIList",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api + 'companies/'+ store.getState().loggedUser.company+'/dsls')
      .get('?access_token=' + store.getState().loggedUser.token)
      .reply(200, result)

    const expectedActions = [
      { type: 'waiting', operation: 'getDSLIList' },
      { type: 'getDSLIList', listDSLI: result}
    ]

    return store.dispatch(actions.getDSLIList())
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
		nock(api + 'companies/'+ store.getState().loggedUser.company+'/dsls')
      .get('?access_token=' + store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'getDSLIList' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.getDSLIList())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
