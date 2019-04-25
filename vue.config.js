const path = require('path');

//console.log(process.env.env);
var port = 8000;
var public = 'ice.broke-it.net';
if (process.env.NODE_ENV === 'dev') {
  port = 3002;
  public = 'app2.lvmgmtllc.com';
}
//console.log(port, process.env);
module.exports = {
  configureWebpack: {
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true,
      inline: true,
      host: '0.0.0.0',
      port: port,
      public: public,
      proxy: {
        '/api': {
          target: 'http://localhost:3002',
          //pathRewrite: { '^/api': '' },
        },
      },
      //allowedHosts: ['ice.broke-it.net:2680', 'ice.broke-it.net'],
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/global.scss')],
    },
  },
};
