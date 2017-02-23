import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Hashtag from '../../src/components/Entities/Hashtag'

test('Hashtag component', (t) => {
  setupJsdom()

  const wrapper = mount(<Hashtag />)

  t.pass(
    expect(wrapper.find('.ld-hashtag').hasClass('ld-hashtag')).toEqual(true)
  )

  t.end()
});
