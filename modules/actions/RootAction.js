import request from 'superagent'
import {push} from 'react-router-redux'
import cloneDSLI from './cloneDSLI'
/*import * from './changeImage'
import * from './changePassword'
import * from './companyRegistration'
import * from './deleteDSLI'
import * from './deleteUser'
import * from './newDSLI'
import * from './renameDSLI'
import * from './saveTextDSLI'
import * from './userRegistration'
*/
export default {cloneDSLI}

export function displayError(error){
  return { type: 'ERR',
           err : error
  }
}

export function refresh(){
  return { type: '-'}
}

export function redirect(url){
  return push(url)
}

export function getProfile(store, email){
  /*var promise = request
  .head('http://www.zinoo.it:3000/api/users/'+email)
  .then(function(err){
    store.dispatch(push('/login/repwd'))
  },
  function(err){
    store.dispatch(push('/login/repwd'))
    //store.dispatch(displayError("ERRORE UTENTE NON REGISTRATO"));
  })*/


  return { type: 'REQUESTED_PROFILE',
           value: {
             email : "ciccio@pasticcio",
             name : "Pasticcio Ciccio"
           }
        }
}


export function emailResetPassword(store, email){
  var promise = request
  .head('http://www.zinoo.it:3000/api/users/'+email)
  .then(function(err){
    store.dispatch(push('/login/repwd'))
  },
  function(err){
    store.dispatch(push('/login/repwd'))
    //store.dispatch(displayError("ERRORE UTENTE NON REGISTRATO"));
  })

  return { type: 'REQUESTED_COMPANY_EXISTANCE' }
}


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

export function attemptLogin(store, user, pwd){
  store.dispatch(push('/home'))
  return { type: 'AT' }
}

export function logout(store, user, pwd){
  return { type: 'AL' }
}
