import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Home from '../../components/Home'

test('Home component', (t) => {
  setupJsdom()
  const wrapper = mount( <Home /> )
  const component = shallow(<Home />)

  t.equal(
    component.find('div').length, 1, 'the Home component has 1 p element'
  )

  t.end()
});
