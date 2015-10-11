# React Image Size Loader

Webpack loader for images which generates React `<img />` components with
`height` and `width` attributes set.

## Installation

    % npm install react-image-size-loader

Webpack config example:

    module.exports = {
      module: {
        loaders: [
          {
            test: /\.(gif|jpeg|jpg|png|svg)$/,
            loader: 'react-image-size-loader'
          }
        ]
      }
    }

Code example:

    import Logo from './cat.jpg'

    React.render(<Logo />) // => <img width="300" height="188" src="cat.jpg" />
