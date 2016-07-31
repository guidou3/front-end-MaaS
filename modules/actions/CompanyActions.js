// {signCompany, postCompany, getCompanies, updateCompanies}

export function signCompany(store, company, owner){
  var promise = request
  .head('http://www.zinoo.it:3000/api/aziende/'+company)
  .then(function(err){
    store.dispatch(displayError("ERRORE AZIENDA GIA REGISTRATA"));
  },
  function(err){
    store.dispatch(postCompany(store, company, owner));
  })

  return { type: 'REQUESTED_COMPANY_EXISTANCE' }
}

export function postCompany(store, company, owner){
  var promise = request
  .post('http://www.zinoo.it:3000/api/aziende')
  .send({
    nome: company,
    partitaIva: "0000",
    proprietario: owner,
    id: company
  })
  .then(function(err){
    store.dispatch(updateCompanies(err.text));
  },
  function(err){
    store.dispatch(displayError(err.toString()));
  })

  return { type: 'REQUESTED_SIGNIN' }
}

export function getCompanies(store){
  var promise = request
  .get('http://www.zinoo.it:3000/api/aziende')
  .then(function(err){
    store.dispatch(updateCompanies(err.text));
  },
  function(err){
    store.dispatch(displayError(err.toString()));
  })

  return { type: 'REQUESTED_COMPANIES' }
}

export function updateCompanies(json){
  return { type: 'RECEIVED_COMPANIES',
           companies : json
  }
}
