import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import About from '../../components/About'

test('About component', (t) => {
  setupJsdom()
  const wrapper = mount( <About /> )
  const component = shallow(<About />)

  t.equal(
    component.find('div').length, 1, 'the About component has 1 p element'
  )

  t.end()
});
