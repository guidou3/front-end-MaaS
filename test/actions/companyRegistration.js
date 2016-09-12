import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../modules/actions/RootAction'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const api = 'https://maas-demo.herokuapp.com/api/'

const middlewares = [ thunk.withExtraArgument(api) ]
const mockStore = configureMockStore(middlewares)

const data = {
  companyName: "nomeprova",
  mail: "ciao@ciao.com"
}

describe('The action creator checkCompanyName:', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should be able to create an action of type "checkCompanyName",', () => {
    nock(api +'companies/'+ data.companyName + '/exists')
      .get('') //da mettere l'url, e i dati inseriti
      .reply(200, {body:{"exists": false}}) //non so cosa restituisca loopback

      nock('https://maas-demo.herokuapp.com/api/accounts/'+ data.mail + '/exists')
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

  it('should be able to  create an action of type "failedCheckCompanyName",', () => {
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

  it('should be able to  create an action of type "failedCheckUsername",', () => {
    nock(api +'companies/' + data.companyName + '/exists')
      .persist()
      .get('')
      .reply(200, {exists: false})

    nock('https://maas-demo.herokuapp.com/api/accounts/'+ data.mail + '/exists')
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

  it('should be able to  create an action of type "error".', () => {
    nock(api +'companies/' + data.companyName + '/exists')
      .persist()
      .get('')
      .reply(404, {error: "Error from testing"})

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

describe('The action creator companyRegistration:', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('should be able to  create an action of type "companyRegistration",', () => {
    const store = mockStore({
      loggedUser: {
        accessLevel:3,
        account:'ACCOUNT',
        company:'COMPANY',
        token:'TOKEN'
      }
    })
    nock(api +'companies')
      .persist()
      .post('')
      .reply(200, {})

    const expectedActions = [
      { type: 'waiting', operation:'companyRegistration' },
      { type: 'companyRegistration' },
      {  type: 'waiting', operation:'userRegistration' }
    ]

    return store.dispatch(actions.companyRegistration(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should be able to  create an action of type "error".', () => {
    nock(api +'companies')
      .persist()
      .post('')
      .reply(404, {error: "Error from testing"})

    const expectedActions = [
      { type: 'waiting', operation:'companyRegistration' },
      { type: 'error', error:404 }
    ]
    const store = mockStore({ DSLI: 0 })

    return store.dispatch(actions.companyRegistration(data))
      .then(function() {
        return expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
