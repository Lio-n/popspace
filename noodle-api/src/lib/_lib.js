const shared = require("@withso/noodle-shared")

const lib = {
  shared: shared.default,
  log: require("./log.js"),
  util: require("./util.js"),
  appInfo: require("./app_info.js"),
  error: require("./error.js"),
  feedback: require("./feedback"),
  wallpapers: require("./wallpapers.js"),
  init: async () => {
    if(process.env.NODE_ENV == "test") {
      lib.test = require("../../test/_test.js")
    }
  },
  cleanup: async () => {
  },
  opengraph: require('./opengraph.js'),
  s3: require('./s3.js')
}

module.exports = lib
