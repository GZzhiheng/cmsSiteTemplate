var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IMAGE_ROOT: '"http://v2.networkgrand.com:81/res/download?id="',
  LOGIN_URL: '"http://v2.networkgrand.com:81/login?redirect={redirect}"'
})
