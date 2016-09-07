import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://mass-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const data = {
  companyName: "nomeprova",
  ownerMail: "ciao@ciao.com"
}

describe('The action creator checkCompanyName', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should create an action of type "checkCompanyName" after having successfully verified that said name for the company is not already used,', () => {
    nock(api +'companies/'+ data.companyName + '/exists')
      .persist()
      .get('') //da mettere l'url, e i dati inseriti
      .reply(200, {body:{"exists": false}}) //non so cosa restituisca loopback

      nock('https://mass-demo.herokuapp.com/api/accounts/'+ data.ownerMail + '/exists')
        .persist()
        .get('') //da mettere l'url, e i dati inseriti
        .reply(200, {body:{"exists": false}}) //non so cosa restituisca loopback

    const expectedActions = [
      { type: 'waiting', operation:'checkCompanyName' },
      { type: 'checkCompanyName' },
      { type: 'waiting', operation: 'companyRegistration'}
    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.checkCompanyName(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should create an action of type "failedCheckCompanyName" after having received the information that said name for the company is already used,', () => {
    nock(api +'companies/' + data.companyName + '/exists')
      .persist()
      .get('') //da mettere l'url, e i dati inseriti
      .reply(200, {exists: true}) //non so cosa restituisca loopback

    const expectedActions = [
      { type: 'waiting', operation:'checkCompanyName' },
      { type: 'failedCheckCompanyName' }
    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.checkCompanyName(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should create an action of type "failedCheckUsername" after having received the information that the owner\'s username is already used,', () => {
    nock(api +'companies/' + data.companyName + '/exists')
      .persist()
      .get('')
      .reply(200, {exists: false})

    nock('https://mass-demo.herokuapp.com/api/accounts/'+ data.ownerMail + '/exists')
        .persist()
        .get('')
        .reply(200, {exists: true})

    const expectedActions = [
      { type: 'waiting', operation:'checkCompanyName' },
      { type: 'failedCheckUsername' }
    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.checkCompanyName(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should create an action of type "error" after having received an error from the API,', () => {
    nock(api +'companies/' + data.companyName + '/exists')
      .persist()
      .get('')
      .reply(404, {error: "Error from testing"})

    nock('https://mass-demo.herokuapp.com/api/accounts/'+ data.ownerMail + '/exists')
        .persist()
        .get('')
        .reply(200, {exists: true})

    const expectedActions = [
      { type: 'waiting', operation:'checkCompanyName' },
      { type: 'error', error:404 }
    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.checkCompanyName(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
