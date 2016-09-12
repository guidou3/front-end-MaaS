/*import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const data = {
  name: 'TEST',
  code: 'CODE',
  db: 'DATABASE',
  permits: 0
}

describe('The action creator cloneDSLI', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "newDSLI",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })

    nock(api+ 'companies/'+ store.getState().loggedUser.company +'/dsls')
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(200, {
            accountId: store.getState().loggedUser.account,
            companyId: store.getState().loggedUser.company,
            id: 'ID',
            lastModifiedDate:"2016-09-06T17:15:57.000Z",
            name:"TEST",
            permits:data.permits
          })

    const expectedActions = [
      { type: 'waiting', operation: 'newDSLI' },
      { type: 'newDSLI', DSLI:{
            accountId: store.getState().loggedUser.account,
            companyId: store.getState().loggedUser.company,
            id: 'ID',
            lastModifiedDate:"2016-09-06T17:15:57.000Z",
            name:"TEST",
            permits:data.permits
          } }
    ]

    return store.dispatch(actions.cloneDSLI(data, 2))
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

    nock(api+ 'companies/'+ store.getState().loggedUser.company +'/dsls')
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(404, {error: "Error from testing"})

    const expectedActions = [
      { type: 'waiting', operation:'newDSLI' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.cloneDSLI(data, 2))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})*/
