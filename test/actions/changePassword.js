import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

describe('The action creator changePassword', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "changePassword",', () => {
    nock(api+ 'accounts/newpwd')
      .post('')
      .reply(200, { })

    const expectedActions = [
      { type: 'waiting', operation: 'changePassword' },
      { type: 'changePassword' }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.changePassword('NEWPWD', 'TOKEN'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
  it('should be able to  create an action of type "error".', () => {
    nock(api+ 'accounts/newpwd')
      .post('')
      .reply(404, {error: "Error from testing"})

    const expectedActions = [
      { type: 'waiting', operation:'changePassword' },
      { type: 'error', error:404 }
    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.changePassword('NEWPWD', 'TOKEN'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
