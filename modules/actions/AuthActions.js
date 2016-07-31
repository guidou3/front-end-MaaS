//{attemptLogin, logout}
export function attemptLogin(store, user, pwd){
  store.dispatch(push('/'))
  return { type: 'AT' }
}

export function logout(store, user, pwd){
  return { type: 'AL' }
}
