var path = require('path');
var package = require('./package');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config');
var webpackCompiler = webpack(webpackConfig);
var handler;

// {{ settings for nico
exports.site = {
  name: package.name,
  description: package.description,
  repo: package.repository.url,
  issues: package.bugs.url,
  homeLink: '/css/kuma/',
  navigation: [
    {
        text: '首页',
        link: '/'
    },
    {
        text: 'css',
        link: '/css/kuma/'
    },
    {
        text: '组件',
        link: '/components/calendar/'
    }
  ],
  urlPrefix: ''
};
exports.engine = 'jade';
exports.package = package;
exports.theme = 'theme';
exports.source = path.join(process.cwd(), 'site');
exports.output = path.join(process.cwd(), '_site');
exports.permalink = '{{directory}}/{{filename}}';
exports.ignorefilter = function(filepath, subdir, filename) {
    return true;
};
exports.middlewares = [{
  name: 'webpackDevMiddleware',
  filter: /\.(js|css)(\.map)?$/,
  handle: function(req, res, next) {
    handler = handler || webpackMiddleware(webpackCompiler, {
      publicPath: '/static/',
      lazy: true,
      stats: {
        hash: false,
        cached: false,
        cachedAssets: false,
        colors: true
      }
    });
    try {
      return handler(req, res, next);
    } catch(e) {}
  }
}];
exports.writers = [
  'nico-jsx.PageWriter',
  'nico-jsx.StaticWriter',
  'nico-jsx.FileWriter'
];
// end settings }}

process.on('uncaughtException', function(err) {
  console.log(err);
});
