import fetch from 'isomorphic-fetch'

export function incrementCounter(){
  return { type: 'INCREMENT' }
}

export function decrementCounter(){
  return { type: 'DECREMENT' }
}

export function updateCompanies(json){
  return { type: 'UPDATE_COMPANIES',
           companies : json
  }
}

export function getCompanies(){
  const promise = fetch('http://www.zinoo.it:3000/api/aziende').then(response => response.json())
  promise.resolve("Success").then(function(value) {
    console.log(value); // "Success"
  }, function(value) {
  // not called
});
}
