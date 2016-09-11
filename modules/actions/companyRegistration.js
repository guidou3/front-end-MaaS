/*
* Name : companyRegistrationjs
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-12    Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
//le funzioni receive...
import request from 'superagent'
import {push} from 'react-router-redux'
import {userRegistration} from './userRegistration'

function requestCheckCompanyName() {
	return {
		type: 'waiting',
		operation: 'checkCompanyName'
	}
}

function receiveCheckCompanyName(bool, step) {
	if(bool){
	  if(step > 0)
			return { type: 'failedCheckUsername'}
		else
			return { type: 'failedCheckCompanyName' }
	}
	else
		return { type: 'checkCompanyName' }
}

function receiveError(error) {
		return {
			type: 'error',
			error: error
		}
}

export function checkCompanyName(data) {
	return function(dispatch, getState, api){
		dispatch(requestCheckCompanyName())
		return request
			.get(api + 'companies/' + data.companyName + '/exists')
			.then(
				function(res){
					if(res.body.exists) {
						dispatch(receiveCheckCompanyName(true, 0))
					}
					else {
						return request
							.get(api + 'accounts/' + data.mail + '/exists')
							.then(
								function(res){
									if(res.body.exists) {
										dispatch(receiveCheckCompanyName(true, 1))
									}
									else {
										dispatch(receiveCheckCompanyName(false, 2))
										dispatch(companyRegistration(data))
									}
								},
								function(err){
									dispatch(receiveError(err.status))
								}
							)
					}
				},
				function(err){
					dispatch(receiveError(err.status))
				}
			)
	}
}

function requestCompanyRegistration() {
	return {
		type: 'waiting',
		operation: 'companyRegistration'
	}
}

function receiveCompanyRegistration(bool, text) {
	if(bool) return {
		type: 'companyRegistration'
		}
	else return {
		type: 'error',
		error: text
		}
}

export function companyRegistration(data) {
	return function(dispatch, getState, api){
		dispatch(requestCompanyRegistration())
		return request
			.post(api + 'companies')
			.send({
				organization: data.companyName,
				ownerId: data.mail,
				subscribedAt: Date()
			})
			.then(function() {
					dispatch(receiveCompanyRegistration(true))
					dispatch(userRegistration(data, 3))
				},
				function(err){
					dispatch(receiveCompanyRegistration(false, err.status))
				}
			)
	}
}
