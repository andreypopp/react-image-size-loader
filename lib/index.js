/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */
'use strict';

var imageSizeLoader = require('image-size-loader');

module.exports = function reactImageSizeLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  source = imageSizeLoader.call(this, source);
  source = [
    source,
    'var __image = module.exports;',
    'var __React = require("react");',
    'module.exports = function ReactImageSize(props) {',
    '  var imgProps = {};',
    '  for (var key in props) {',
    '    if (props.hasOwnProperty(key)) {',
    '      imgProps[key] = props[key];',
    '    }',
    '  }',
    '  imgProps.width = __image.width;',
    '  imgProps.height = __image.height;',
    '  imgProps.src = __image.src;',
    '  return {',
    '    type: "img",',
    '    props: imgProps',
    '  };',
    '};',
  ].join('\n');
  return source;
};
