import { getDefaultKeyBinding } from 'draft-js'

import { KEY_COMMANDS } from './constants'

const { changeType, showLinkInput } = KEY_COMMANDS

/* Emits various key commands to be used by `handleKeyCommand` in the Editor */
export default (e) => {
  if (e.altKey === true && !e.ctrlKey) {
    if (e.shiftKey === true) {
      switch (e.which) {
        // Alt + Shift + A
        default: return getDefaultKeyBinding(e);
      }
    }
    switch (e.which) {
      // 1
      case 49: return changeType('ordered-list-item');
      // @
      case 50: return showLinkInput();
      // #
      case 51: return changeType('header-three');
      // *
      case 56: return changeType('unordered-list-item');
      // <
      case 188: return changeType('caption');
      // // -
      // case 189: return 'changetype:caption';
      // >
      case 190: return changeType('unstyled');
      // "
      case 222: return changeType('blockquote');
      default: return getDefaultKeyBinding(e);
    }
  }
  return getDefaultKeyBinding(e)
}
