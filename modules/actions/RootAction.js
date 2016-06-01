import fetch from 'isomorphic-fetch'

export function incrementCounter(){
  return { type: 'INCREMENT' }
}

export function decrementCounter(){
  return { type: 'DECREMENT' }
}

export function updateCompanies(json){
  return { type: 'RECEIVED_COMPANIES',
           companies : json
  }
}

export function getCompanies(store){
  //return updateCompanies(fetch('http://www.zinoo.it:3000/api/aziende').then(response => response.json()))
  const promise = fetch('http://www.zinoo.it:3000/api/aziende').then(response => response.json())
  let result = 0
  Promise.resolve(promise).then(function(value) {
    store.dispatch(updateCompanies(value))
  }
)
  return { type: 'REQUESTED_COMPANIES' }
}
