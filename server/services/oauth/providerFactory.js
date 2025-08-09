const github = require("./provider/github");
const google = require("./provider/google");

const providers = { github, google };

module.exports.get = function get(name) {
  return providers[name];
};
