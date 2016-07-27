import request from 'superagent'

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

export function displayError(error){
  return { type: 'ERR',
           err : error
  }
}

export function refresh(){
  return { type: '-'}
}

export function getCompanies(store){
  var promise = request
  .post('http://www.zinoo.it:3000/api/aziende')
  .send({
    nome: "ciaaoo",
    partitaIva: "asd",
    proprietario: "asd",
    id: "asd"
  })
  .then(function(err){
    store.dispatch(updateCompanies(err.text));
  },
  function(){
    store.dispatch(displayError("ERRORE API NON RISPONDE"));
  })

  return { type: 'REQUESTED_COMPANIES' }
}

export function attemptLogin(store, credentials){
  console.log(credentials)
  return { type: 'AT' }
}
