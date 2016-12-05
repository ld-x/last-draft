import Header from './Header'
import Youtube from './Youtube'
import ResizeDiv from './ResizeDiv'

var blocks = {
  'header-1': Header(1),
  'header-2': Header(2),
  'header-3': Header(3),
  'header-4': Header(4),
  'header-5': Header(5),
  youtube: Youtube,
  'resizeable-div': ResizeDiv
}

export const Blocks = blocks
