/*
* Name :  RootAcrions.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-27    Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
* 0.2.0           2016-08-15    Guido Santi
* -------------------------------------------------
* Modifica del modulo
* =================================================
*/
import request from 'superagent'
import {push} from 'react-router-redux'
import {changeDSLIPermits} from './changeDSLIPermits'
import {changePassword} from './changePassword'
import {cloneDSLI} from './cloneDSLI'
import {contactSupport} from './contactSupport'
import {checkCompanyName, companyRegistration} from './companyRegistration'
import {deleteDSLI} from './deleteDSLI'
import {deleteUser} from './deleteUser'
import {deleteData} from './deleteData'
import {execDSLI} from './execDSLI'
import {sendResetMail} from './emailResetPassword'
import {getDSLI} from './getDSLI'
import {getDSLIList} from './getDSLIList'
import {getUserList} from './getUserList'
import {login, logout, embodyUser} from './login'
import {setAccessLevel} from './setAccessLevel'
import {newDSLI} from './newDSLI'
import {saveTextDSLI} from './saveTextDSLI'
import {sendDSLI} from './sendDSLI'
import {getDatabase} from './getDatabase'
import {addDatabase} from './addDatabase'
import {checkUsername, userRegistration} from './userRegistration'

export {
  addDatabase,
  changeDSLIPermits,
  changePassword,
  cloneDSLI,
  checkCompanyName,
  contactSupport,
  companyRegistration,
  deleteDSLI,
  deleteUser,
  deleteData,
  embodyUser,
  execDSLI,
  getDatabase,
  getDSLI,
  getDSLIList,
  getUserList,
  login,
  setAccessLevel,
  sendResetMail,
  logout,
  newDSLI,
  saveTextDSLI,
  sendDSLI,
  checkUsername,
  userRegistration
}

export function displayError(error){
  return { type: 'ERR',
           err : error
  }
}

export function refresh(){
  return { type: '-'}
}

export function redirect(url){
  return function(dispatch){
  		dispatch(push(url))
  }
}

export function setDSLI(DSLI) {
	return {
		type: 'setDSLI',
		dsli: DSLI
	}
}
/*
=======
>>>>>>> master
export function updateCompanies(json){
  return { type: 'RECEIVED_COMPANIES',
           companies : json
  }
}

export function attemptLogin(user, pwd){
  return function(dispatch){
    dispatch(login("asd","asd"))
    dispatch(redirect('/home'))
  }
}

export function login(user, pwd){
  return { type: 'AT' }
}

export function logout(user, pwd){
  return { type: 'AL' }
}



/*
export function getProfile(store, email){
  /*var promise = request
  .head('http://www.zinoo.it:3000/api/users/'+email)
  .then(function(err){
    store.dispatch(push('/login/repwd'))
  },
  function(err){
    store.dispatch(push('/login/repwd'))
    //store.dispatch(displayError("ERRORE UTENTE NON REGISTRATO"));
  })


  return { type: 'REQUESTED_PROFILE',
           value: {
             email : "ciccio@pasticcio",
             name : "Pasticcio Ciccio"
           }
        }
}


export function emailResetPassword(email){
  var promise = request
  .head('http://www.zinoo.it:3000/api/users/'+email)
  .then(function(err){
    dispatch(push('/login/repwd'))
  },
  function(err){
    dispatch(displayError("ERRORE UTENTE NON REGISTRATO"));
  })

  return { type: 'REQUESTED_COMPANY_EXISTANCE' }
}


export function signCompany(company, owner){
  var promise = request
  .head('http://www.zinoo.it:3000/api/aziende/'+company)
  .then(function(err){
    store.dispatch(displayError("ERRORE AZIENDA GIA REGISTRATA"));
  },
  function(err){
    store.dispatch(postCompany(company, owner));
  })

  return { type: 'REQUESTED_COMPANY_EXISTANCE' }
}

export function postCompany(company, owner){
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

export function getCompanies(){
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

*/
