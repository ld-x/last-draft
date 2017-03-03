/*
 * Copyright (c) 2016, sstur (https://github.com/sstur/draft-js-export-html)
 *
 * License: MIT
 */

/* combineOrderedStyles */

function combineOrderedStyles( customMap, defaults ) {
 if (customMap == null) {
   return defaults;
 }
 let [defaultStyleMap, defaultStyleOrder] = defaults;
 let styleMap = {...defaultStyleMap};
 let styleOrder = [...defaultStyleOrder];
 for (let styleName of Object.keys(customMap)) {
   if (defaultStyleMap.hasOwnProperty(styleName)) {
     let defaultStyles = defaultStyleMap[styleName];
     styleMap[styleName] = {...defaultStyles, ...customMap[styleName]};
   } else {
     styleMap[styleName] = customMap[styleName];
     styleOrder.push(styleName);
   }
 }
 return [styleMap, styleOrder];
}

/* normalizeAttributes */

const ATTR_NAME_MAP = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv'
}

function normalizeAttributes(attributes) {
  if (attributes == null) {
    return attributes;
  }
  let normalized = {};
  let didNormalize = false;
  for (let name of Object.keys(attributes)) {
    let newName = name;
    if (ATTR_NAME_MAP.hasOwnProperty(name)) {
      newName = ATTR_NAME_MAP[name];
      didNormalize = true;
    }
    normalized[newName] = attributes[name];
  }
  return didNormalize ? normalized : attributes;
}

/* styleToCSS */

import {isUnitlessNumber} from 'react-dom/lib/CSSProperty'

const VENDOR_PREFIX = /^(moz|ms|o|webkit)-/;
const NUMERIC_STRING = /^\d+$/;
const UPPERCASE_PATTERN = /([A-Z])/g;

function processStyleName(name) {
  return name
    .replace(UPPERCASE_PATTERN, '-$1')
    .toLowerCase()
    .replace(VENDOR_PREFIX, '-$1-');
}

function processStyleValue(name, value) {
  let isNumeric;
  if (typeof value === 'string') {
    isNumeric = NUMERIC_STRING.test(value);
  } else {
    isNumeric = true;
    value = String(value);
  }
  if (!isNumeric || value === '0' || isUnitlessNumber[name] === true) {
    return value;
  } else {
    return value + 'px';
  }
}

function styleToCSS(styleDescr) {
  return Object.keys(styleDescr).map((name) => {
    let styleValue = processStyleValue(name, styleDescr[name]);
    let styleName = processStyleName(name);
    return `${styleName}: ${styleValue}`;
  }).join('; ');
}

/* draft-js-utils */

export const INLINE_STYLE = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
}

const BLOCK_TYPE = {
  UNSTYLED: 'unstyled',
  HEADER_ONE: 'header-one',
  HEADER_TWO: 'header-two',
  HEADER_THREE: 'header-three',
  HEADER_FOUR: 'header-four',
  HEADER_FIVE: 'header-five',
  HEADER_SIX: 'header-six',
  UNORDERED_LIST_ITEM: 'unordered-list-item',
  ORDERED_LIST_ITEM: 'ordered-list-item',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  CODE: 'code-block',
  ATOMIC: 'atomic',
};

const ENTITY_TYPE = {
  LINK: 'LINK',
  MENTION: 'MENTION',
  IMAGE: 'IMAGE',
};

import {OrderedSet, is} from 'immutable'
const EMPTY_SET = new OrderedSet()

function getEntityRanges(text,charMetaList) {
  let charEntity = null;
  let prevCharEntity = null;
  let ranges = [];
  let rangeStart = 0;
  for (let i = 0, len = text.length; i < len; i++) {
    prevCharEntity = charEntity;
    let meta = charMetaList.get(i);
    charEntity = meta ? meta.getEntity() : null;
    if (i > 0 && charEntity !== prevCharEntity) {
      ranges.push([
        prevCharEntity,
        getStyleRanges(
          text.slice(rangeStart, i),
          charMetaList.slice(rangeStart, i)
        ),
      ]);
      rangeStart = i;
    }
  }
  ranges.push([
    charEntity,
    getStyleRanges(
      text.slice(rangeStart),
      charMetaList.slice(rangeStart)
    ),
  ]);
  return ranges;
}

function getStyleRanges(text, charMetaList) {
  let charStyle = EMPTY_SET;
  let prevCharStyle = EMPTY_SET;
  let ranges = [];
  let rangeStart = 0;
  for (let i = 0, len = text.length; i < len; i++) {
    prevCharStyle = charStyle;
    let meta = charMetaList.get(i);
    charStyle = meta ? meta.getStyle() : EMPTY_SET;
    if (i > 0 && !is(charStyle, prevCharStyle)) {
      ranges.push([text.slice(rangeStart, i), prevCharStyle]);
      rangeStart = i;
    }
  }
  ranges.push([text.slice(rangeStart), charStyle]);
  return ranges;
}

/* stateToHTML */

const {
 BOLD,
 CODE,
 ITALIC,
 STRIKETHROUGH,
 UNDERLINE,
} = INLINE_STYLE;

const INDENT = '  ';
const BREAK = '<br>';
const DATA_ATTRIBUTE = /^data-([a-z0-9-]+)$/;

const DEFAULT_STYLE_MAP = {
 [BOLD]: {element: 'strong'},
 [CODE]: {element: 'code'},
 [ITALIC]: {element: 'em'},
 [STRIKETHROUGH]: {element: 'del'},
 [UNDERLINE]: {element: 'ins'},
};

// Order: inner-most style to outer-most.
// Examle: <em><strong>foo</strong></em>
const DEFAULT_STYLE_ORDER = [BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE];

// Map entity data to element attributes.
const ENTITY_ATTR_MAP = {
 [ENTITY_TYPE.MENTION]: {name: 'name', avatar: 'avatar', url: 'href', rel: 'rel', target: 'target', title: 'title', className: 'class'},
 [ENTITY_TYPE.LINK]: {url: 'href', rel: 'rel', target: 'target', title: 'title', className: 'class'},
 [ENTITY_TYPE.IMAGE]: {src: 'src', height: 'height', width: 'width', alt: 'alt', className: 'class'},
};

// Map entity data to element attributes.
const DATA_TO_ATTR = {
  [ENTITY_TYPE.MENTION](entityType , entity) {
    let attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
    let data = entity.getData();
    let attrs = {};
    for (let dataKey of Object.keys(data)) {
      let dataValue = data[dataKey];
      if (attrMap.hasOwnProperty(dataKey)) {
        let attrKey = attrMap[dataKey];
        attrs[attrKey] = dataValue;
      } else if (DATA_ATTRIBUTE.test(dataKey)) {
        attrs[dataKey] = dataValue;
      }
    }
    return attrs;
  },
 [ENTITY_TYPE.LINK](entityType , entity) {
   let attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
   let data = entity.getData();
   let attrs = {};
   for (let dataKey of Object.keys(data)) {
     let dataValue = data[dataKey];
     if (attrMap.hasOwnProperty(dataKey)) {
       let attrKey = attrMap[dataKey];
       attrs[attrKey] = dataValue;
     } else if (DATA_ATTRIBUTE.test(dataKey)) {
       attrs[dataKey] = dataValue;
     }
   }
   return attrs;
 },
 [ENTITY_TYPE.IMAGE](entityType, entity) {
   let attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
   let data = entity.getData();
   let attrs = {};
   for (let dataKey of Object.keys(data)) {
     let dataValue = data[dataKey];
     if (attrMap.hasOwnProperty(dataKey)) {
       let attrKey = attrMap[dataKey];
       attrs[attrKey] = dataValue;
     } else if (DATA_ATTRIBUTE.test(dataKey)) {
       attrs[dataKey] = dataValue;
     }
   }
   return attrs;
 },
};

// The reason this returns an array is because a single block might get wrapped
// in two tags.
function getTags(blockType) {
 switch (blockType) {
   case BLOCK_TYPE.HEADER_ONE:
     return ['h1'];
   case BLOCK_TYPE.HEADER_TWO:
     return ['h2'];
   case BLOCK_TYPE.HEADER_THREE:
     return ['h3'];
   case BLOCK_TYPE.HEADER_FOUR:
     return ['h4'];
   case BLOCK_TYPE.HEADER_FIVE:
     return ['h5'];
   case BLOCK_TYPE.HEADER_SIX:
     return ['h6'];
   case BLOCK_TYPE.UNORDERED_LIST_ITEM:
   case BLOCK_TYPE.ORDERED_LIST_ITEM:
     return ['li'];
   case BLOCK_TYPE.BLOCKQUOTE:
     return ['blockquote'];
   case BLOCK_TYPE.CODE:
     return ['pre', 'code'];
   case BLOCK_TYPE.ATOMIC:
     return ['figure'];
   default:
     return ['p'];
 }
}

function getWrapperTag(blockType) {
 switch (blockType) {
   case BLOCK_TYPE.UNORDERED_LIST_ITEM:
     return 'ul';
   case BLOCK_TYPE.ORDERED_LIST_ITEM:
     return 'ol';
   default:
     return null;
 }
}

class MarkupGenerator {
 // These are related to state.
 // These are related to user-defined options.

 constructor(contentState, options) {
   if (options == null) {
     options = {};
   }
   this.contentState = contentState;
   this.options = options;
   let [inlineStyles, styleOrder] = combineOrderedStyles(
     options.inlineStyles,
     [DEFAULT_STYLE_MAP, DEFAULT_STYLE_ORDER],
   );
   this.inlineStyles = inlineStyles;
   this.styleOrder = styleOrder;
 }

 generate() {
   this.output = [];
   this.blocks = this.contentState.getBlocksAsArray();
   this.totalBlocks = this.blocks.length;
   this.currentBlock = 0;
   this.indentLevel = 0;
   this.wrapperTag = null;
   while (this.currentBlock < this.totalBlocks) {
     this.processBlock();
   }
   this.closeWrapperTag();
   return this.output.join('').trim();
 }

 processBlock() {
   let {blockRenderers} = this.options;
   let block = this.blocks[this.currentBlock];
   let blockType = block.getType();
   let newWrapperTag = getWrapperTag(blockType);
   if (this.wrapperTag !== newWrapperTag) {
     if (this.wrapperTag) {
       this.closeWrapperTag();
     }
     if (newWrapperTag) {
       this.openWrapperTag(newWrapperTag);
     }
   }
   this.indent();
   // Allow blocks to be rendered using a custom renderer.
   let customRenderer = (blockRenderers != null && blockRenderers.hasOwnProperty(blockType)) ?
     blockRenderers[blockType] :
     null;
   let customRendererOutput = customRenderer ? customRenderer(block) : null;
   // Renderer can return null, which will cause processing to continue as normal.
   if (customRendererOutput != null) {
     this.output.push(customRendererOutput);
     this.output.push('\n');
     this.currentBlock += 1;
     return;
   }
   this.writeStartTag(block);
   this.output.push(this.renderBlockContent(block));
   // Look ahead and see if we will nest list.
   let nextBlock = this.getNextBlock();
   if (
     canHaveDepth(blockType) &&
     nextBlock &&
     nextBlock.getDepth() === block.getDepth() + 1
   ) {
     this.output.push(`\n`);
     // This is a litle hacky: temporarily stash our current wrapperTag and
     // render child list(s).
     let thisWrapperTag = this.wrapperTag;
     this.wrapperTag = null;
     this.indentLevel += 1;
     this.currentBlock += 1;
     this.processBlocksAtDepth(nextBlock.getDepth());
     this.wrapperTag = thisWrapperTag;
     this.indentLevel -= 1;
     this.indent();
   } else {
     this.currentBlock += 1;
   }
   this.writeEndTag(block);
 }

 processBlocksAtDepth(depth        ) {
   let block = this.blocks[this.currentBlock];
   while (block && block.getDepth() === depth) {
     this.processBlock();
     block = this.blocks[this.currentBlock];
   }
   this.closeWrapperTag();
 }

 getNextBlock()               {
   return this.blocks[this.currentBlock + 1];
 }

 writeStartTag(block) {
   let tags = getTags(block.getType());

   let attrString;
   if (this.options.blockStyleFn) {
     let {attributes, style} = this.options.blockStyleFn(block) || {};
     // Normalize `className` -> `class`, etc.
     attributes = normalizeAttributes(attributes);
     if (style != null) {
       let styleAttr = styleToCSS(style);
       attributes = (attributes == null) ? {style: styleAttr} : {...attributes, style: styleAttr};
     }
     attrString = stringifyAttrs(attributes);
   } else {
     attrString = '';
   }

   for (let tag of tags) {
     this.output.push(`<${tag}${attrString}>`);
   }
 }

 writeEndTag(block) {
   let tags = getTags(block.getType());
   if (tags.length === 1) {
     this.output.push(`</${tags[0]}>\n`);
   } else {
     let output = [];
     for (let tag of tags) {
       output.unshift(`</${tag}>`);
     }
     this.output.push(output.join('') + '\n');
   }
 }

 openWrapperTag(wrapperTag        ) {
   this.wrapperTag = wrapperTag;
   this.indent();
   this.output.push(`<${wrapperTag}>\n`);
   this.indentLevel += 1;
 }

 closeWrapperTag() {
   let {wrapperTag} = this;
   if (wrapperTag) {
     this.indentLevel -= 1;
     this.indent();
     this.output.push(`</${wrapperTag}>\n`);
     this.wrapperTag = null;
   }
 }

 indent() {
   this.output.push(INDENT.repeat(this.indentLevel));
 }

 renderBlockContent(block) {
   let blockType = block.getType();
   let text = block.getText();
   if (text === '') {
     // Prevent element collapse if completely empty.
     return BREAK;
   }
   text = this.preserveWhitespace(text);
   let charMetaList                    = block.getCharacterList();
   let entityPieces = getEntityRanges(text, charMetaList);
   return entityPieces.map(([entityKey, stylePieces]) => {
     let content = stylePieces.map(([text, styleSet]) => {
       let content = encodeContent(text);
       for (let styleName of this.styleOrder) {
         // If our block type is CODE then don't wrap inline code elements.
         if (styleName === CODE && blockType === BLOCK_TYPE.CODE) {
           continue;
         }
         if (styleSet.has(styleName)) {
           let {element, attributes, style} = this.inlineStyles[styleName];
           if (element == null) {
             element = 'span';
           }
           // Normalize `className` -> `class`, etc.
           attributes = normalizeAttributes(attributes);
           if (style != null) {
             let styleAttr = styleToCSS(style);
             attributes = (attributes == null) ? {style: styleAttr} : {...attributes, style: styleAttr};
           }
           let attrString = stringifyAttrs(attributes);
           content = `<${element}${attrString}>${content}</${element}>`;
         }
       }
       return content;
     }).join('');
     let entity = entityKey ? this.contentState.getEntity(entityKey) : null;
     // Note: The `toUpperCase` below is for compatability with some libraries that use lower-case for image blocks.
     let entityType = (entity == null) ? null : entity.getType().toUpperCase();
     if (entityType != null && entityType === ENTITY_TYPE.LINK) {
       let attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
       let attrString = stringifyAttrs(attrs);
       return `<a${attrString}>${content}</a>`;
     } else if (entityType != null && entityType === ENTITY_TYPE.MENTION) {
       let attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
       let attrString = stringifyAttrs(attrs);
       return `<a${attrString}>${content}</a>`;
     } else if (entityType != null && entityType === ENTITY_TYPE.IMAGE) {
       let attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
       let attrString = stringifyAttrs(attrs);
       return `<img${attrString}/>`;
     } else {
       return content;
     }
   }).join('');
 }

 preserveWhitespace(text) {
   let length = text.length;
   // Prevent leading/trailing/consecutive whitespace collapse.
   let newText = new Array(length);
   for (let i = 0; i < length; i++) {
     if (
       text[i] === ' ' &&
       (i === 0 || i === length - 1 || text[i - 1] === ' ')
     ) {
       newText[i] = '\xA0';
     } else {
       newText[i] = text[i];
     }
   }
   return newText.join('');
 }

}

function stringifyAttrs(attrs) {
 if (attrs == null) {
   return '';
 }
 let parts = [];
 for (let name of Object.keys(attrs)) {
   let value = attrs[name];
   if (value != null) {
     parts.push(` ${name}="${encodeAttr(value + '')}"`);
   }
 }
 return parts.join('');
}

function canHaveDepth(blockType) {
 switch (blockType) {
   case BLOCK_TYPE.UNORDERED_LIST_ITEM:
   case BLOCK_TYPE.ORDERED_LIST_ITEM:
     return true;
   default:
     return false;
 }
}

function encodeContent(text) {
 return text
   .split('&').join('&amp;')
   .split('<').join('&lt;')
   .split('>').join('&gt;')
   .split('\xA0').join('&nbsp;')
   .split('\n').join(BREAK + '\n');
}

function encodeAttr(text) {
 return text
   .split('&').join('&amp;')
   .split('<').join('&lt;')
   .split('>').join('&gt;')
   .split('"').join('&quot;');
}

export default function stateToHTML(content, options) {
 return new MarkupGenerator(content, options).generate();
}
