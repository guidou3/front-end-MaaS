import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('The action creator deleteData', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "deleteData",', () => {
		const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })

    nock(api + 'companies/' + store.getState().loggedUser.company+'/databases/'+'ID')
      .delete('?access_token='+ store.getState().loggedUser.token)
      .reply(200, { })

    const expectedActions = [
      { type: 'waiting', operation: 'deleteData' },
      { type: 'deleteData', id:'ID' }
    ]

    return store.dispatch(actions.deleteData('ID'))
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

		nock(api + 'companies/' + store.getState().loggedUser.company+'/databases/'+'ID')
      .delete('?access_token='+ store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'deleteData' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.deleteData('ID'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
