const path = require('path')
const extend = require('util')._extend
const local = require('./env/local')
const development = require('./env/development')
const defaults = {
  root: path.normalize(__dirname + '/..')
}

/**
 * Expose
 */

module.exports = {
  development: extend(development, defaults),
  local: extend(local, defaults)
}[process.env.NODE_ENV || 'local']
