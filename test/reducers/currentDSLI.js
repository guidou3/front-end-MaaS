import expect from 'expect'
import reducer from '../../modules/reducers/currentDSLI'

describe('currentDSLIReducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(0)
  })
  it('should handle getDSLI and setDSLI when given all parameters', () => {
    expect(
      reducer(0, {
        type: 'getDSLI',
        dsli:
				{
					id: 'ID',
					name: 'NAME',
					DSLcode: 'CODE',
  				lastModifiedDate: 'DATE',
  				permits: 0,
  				databaseId: 'DATABASE'
				}
      })
    ).toEqual(
      {
        id: 'ID',
        name: 'NAME',
        code: 'CODE',
        lastModifiedDate: 'DATE',
        permits: 0,
        databaseId: 'DATABASE'
      }
    )
})
it('should handle getDSLI and setDSLI when given only part of the parameters', () => {
    expect(
      reducer(
        {
          id: 'ID',
          name: 'NAME',
          code: 'CODE',
          lastModifiedDate: 'DATE',
          permits: 0,
          databaseId: 'DATABASE'
        },
				{
				type: 'setDSLI',
        dsli:
				{
					id: 'ID1',
					name: 'NAME1',
					DSLcode: 'CODE1',
					permits: 'PERMIT1'
				}
      })
    ).toEqual(
			{
				id: 'ID1',
				name: 'NAME1',
				code: 'CODE1',
        lastModifiedDate: undefined,
				permits: 'PERMIT1',
        databaseId: undefined
			}
    )
  })
	it('should handle execDSLI', () => {
    expect(
      reducer(
				{
					id: 'ID',
					name: 'NAME',
					code: 'CODE',
					permit: 'PERMIT'
	      },
				{
				type: 'execDSLI',
        result: 'RESULT'
      })
    ).toEqual(
			{
				id: 'ID',
				name: 'NAME',
				code: 'CODE',
				permit: 'PERMIT',
				result: 'RESULT'
			}
    )
  })

	it('should handle logout and embodyUser', () => {
    expect(
      reducer(
				{
					id: 'ID',
					name: 'NAME',
					code: 'CODE',
					permit: 'PERMIT'
	      },
				{
				type: 'logout'
      })
    ).toEqual(0)
  })
})
