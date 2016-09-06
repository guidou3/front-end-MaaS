import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/counter'
import request from 'superagent';
import nocker from 'superagent-nock';
import expect from 'expect' // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('The action creator changePassword', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates an action of type "changePassword" after having successfully updated the password.', () => {
    nock('https://mass-demo.herokuapp.com/api')
      .get('/accounts/newpwd')
      .reply(200, { })

    const expectedActions = [
      { type: 'waiting', operation: 'changePassword' },
      { type: 'changePassword' }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.changePassword('nuovaPassword'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
