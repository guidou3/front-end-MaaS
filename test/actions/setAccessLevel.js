import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const user = {
  id:'ID',
  level:'1'
}

describe('The action creator setAccessLevel', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "setAccessLevel",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api + 'companies/'+ store.getState().loggedUser.company + '/users/' + user.id + '/permit/'+ user.level)
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(200, { })

    const expectedActions = [
      { type: 'waiting', operation: 'setAccessLevel' },
      { type: 'setAccessLevel' }
    ]

    return store.dispatch(actions.setAccessLevel(user))
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
    nock(api + 'companies/'+ store.getState().loggedUser.company + '/users/' + user.id + '/permit/'+ user.level)
      .post('?access_token=' + store.getState().loggedUser.token)
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'setAccessLevel' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.setAccessLevel(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
