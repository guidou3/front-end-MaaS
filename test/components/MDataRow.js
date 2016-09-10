import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import MDataRow from '../../modules/components/MDataRow'
const data =
{
  tag:'tag',
  id:'id'
}

function setup() {
  const props = {
    store: expect.createSpy()
  }

  const enzymeWrapper = shallow(<MDataRow data={data}/>);

  return {
    props,
    enzymeWrapper
  }
}


describe('MDataRow', () => {

  it('should contain in the first column the tag', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('.col1').text()).toBe(data.tag)
  })
  it('should contain in the second column the id', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('.col2').text()).toBe(data.id)

  })
  it('should contain in the third column a <Button />', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('.col3').text()).toBe('<Button />')
  })
  //aggiungere il controllo sulla chiamata dell'action creator se viene cliccato il pulsante


})
