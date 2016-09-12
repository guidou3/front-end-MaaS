import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const data = {
  email:'EMAIL',
  text:'TEXT'
}

describe('The action creator contactSupport', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "support",', () => {
    const store = mockStore({ })

    nock(api + 'accounts/help/'+ data.email)
      .post('')
      .reply(200, { })

    const expectedActions = [
      { type: 'waiting', operation: 'support' },
      { type: 'support' }
    ]

    return store.dispatch(actions.contactSupport(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should be able to  create an action of type "error".', () => {
    const store = mockStore({  })

		nock(api + 'accounts/help/'+ data.email)
      .post('')
      .reply(404, { })

    const expectedActions = [
      { type: 'waiting', operation:'support' },
      { type: 'error', error:404 }
    ]

    return store.dispatch(actions.contactSupport(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
