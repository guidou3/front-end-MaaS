import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const id = 'ID'
const data = 'DATA'
const result = {cosa:'TEST!'}

describe('The action creator execDSLI', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "execDSLI",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api + 'dsl/'+ id +'/execute')
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(200, result)

    const expectedActions = [
      { type: 'waiting', operation: 'execDSLI' },
      { type: 'execDSLI', result: result }
    ]

    return store.dispatch(actions.execDSLI(id, data))
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
    nock(api + 'dsl/'+ id +'/execute')
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'execDSLI' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.execDSLI(id, data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
