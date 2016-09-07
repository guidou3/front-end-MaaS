import expect from 'expect'
import reducer from '../../modules/reducers/loggedUser'

describe('loggedUserReducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(0)
  })
  it('should handle login', () => {
    expect(
      reducer(0, {
        type: 'login',
        user:
				{
          account: 'ACCOUNT',
      		accessLevel: 0,
      		token: 'TOKEN',
      		company: 'COMPANY'
				}
      })
    ).toEqual(
      {
        account: 'ACCOUNT',
        accessLevel: 0,
        token: 'TOKEN',
        company: 'COMPANY'
      }
    )
  })
	it('should handle changeAccessLevel', () => {
    expect(
      reducer({
				username: 'USERNAME',
				accessLevel: 'ACCESSLEVEL',
				image: 'IMAGE'
      },
			{
        type: 'changeAccessLevel',
        newLevel: 'NEWLEVEL'
      })
    ).toEqual(
      {
				username: 'USERNAME',
				accessLevel: 'NEWLEVEL',
				image: 'IMAGE'
      }
    )
  })
	it('should handle logout', () => {
    expect(
      reducer({
				username: 'USERNAME',
				accessLevel: 'LEVEL',
				image: 'NEWIMAGE'
      },
      {
        type: 'logout'
      })
    ).toEqual(0)
  })
})
