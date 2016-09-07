import expect from 'expect'
import reducer from '../../modules/reducers/DSLIList'

describe('DSLIListReducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(0)
  })
	it('should handle getDSLIList', () => {
    expect(
      reducer([
				{
					id: 'ID',
					name: 'NAME',
					permit: 'PERMIT'
				},
				{
					id: 'ID1',
					name: 'NAME1',
					permit: 'PERMIT1'
				}
			],
			{
        type: 'getDSLIList',
        listDSLI:
				[
					{
						id: 'ID',
						name: 'NAME',
						permit: 'PERMIT'
					},
					{
						id: 'ID1',
						name: 'NAME1',
						permit: 'PERMIT1'
					},
					{
						id: 'ID2',
						name: 'NAME2',
						permit: 'PERMIT2'
					},
					{
						id: 'ID3',
						name: 'NAME3',
						permit: 'PERMIT3'
					}
				]
      })
    ).toEqual(
			[
				{
					id: 'ID',
					name: 'NAME',
					permit: 'PERMIT'
				},
				{
					id: 'ID1',
					name: 'NAME1',
					permit: 'PERMIT1'
				},
				{
					id: 'ID2',
					name: 'NAME2',
					permit: 'PERMIT2'
				},
				{
					id: 'ID3',
					name: 'NAME3',
					permit: 'PERMIT3'
				}
			]
    )
  })
	it('should handle logout and embodyUser', () => {
    expect(
      reducer([
				{
					id: 'ID',
					name: 'NEWNAME',
					permit: 'PERMIT'
				},
				{
					id: 'ID1',
					name: 'NAME1',
					permit: 'PERMIT1'
				},
				{
					id: 'ID2',
					name: 'NAME2',
					permit: 'PERMIT2'
				},
				{
					id: 'ID3',
					name: 'NAME3',
					permit: 'PERMIT3'
				},
				{
					id: 'ID4',
					name: 'NAME4',
					permit: 'PERMIT4'
				}
			],
      {
        type: 'logout'
      })
    ).toEqual(0)
  })
})
