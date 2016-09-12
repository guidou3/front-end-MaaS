import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const email = 'ciao@ciao.sberla'

describe('The action creator sendResetMail', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should create an action of type "sendResetMail" after having successfully contacted the API server,', () => {
    nock(api +'accounts/'+ email +'/pwdmail')
      .persist()
      .post('') //da mettere l'url, e i dati inseriti
      .reply(200) //non so cosa restituisca loopback

    const expectedActions = [
      { type: 'waiting', operation:'resetMail' },
      { type: 'sendResetMail' }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.sendResetMail(email))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })
  it('should create an action of type "error" after having received an error from superagent,', () => {
    nock(api +'accounts/'+ email +'/pwdmail')
      .persist()
      .post('') //da mettere l'url, e i dati inseriti
      .reply(404) //non so cosa restituisca loopback

    const expectedActions = [
      { type: 'waiting', operation:'resetMail'},
      { type: 'error', error:404 }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.sendResetMail(email))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
