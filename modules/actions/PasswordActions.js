export function emailResetPassword(store, email){
  var promise = request
  .head('http://www.zinoo.it:3000/api/users/'+email)
  .then(function(err){
    store.dispatch(push('/'))
  },
  function(err){
    store.dispatch(displayError("ERRORE UTENTE NON REGISTRATO"));
  })

  return { type: 'REQUESTED_COMPANY_EXISTANCE' }
}
