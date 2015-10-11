var assert = require('assert');
var webpack = require('webpack');
var eval = require('eval');
var MemoryFS = require('memory-fs');
var ReactDOMServer = require('react-dom/server');

var loader = require.resolve('../index');

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

describe('react-image-size-loader', function() {

  it('generates a module with React component', function(done) {
    var compiler = webpack({
      context: __dirname,
      entry: './cat.jpg',
      bail: true,
      target: 'node',
      output: {
        path: '/',
        publicPath: '/assets/',
        libraryTarget: 'commonjs2',
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {test: /\.jpg$/, loader: loader}
        ]
      }
    });
    compiler.outputFileSystem = new MemoryFS();

    compiler.run(function(err, stats) {
      if (err) {
        return done(err);
      }
      var bundle = compiler.outputFileSystem.readFileSync('/bundle.js').toString();
      var Image = eval(bundle, global);
      var element = Image();
      element.$$typeof = REACT_ELEMENT_TYPE;
      var markup = ReactDOMServer.renderToStaticMarkup(element);
      assert(
        /<img width="300" height="188" src="\/assets\/cat\.jpg"\/>/.exec(markup)
      );
      done();
    });
  });

});
