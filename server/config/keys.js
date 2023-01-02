// const googleClientID = "";
// const googleClientSecret = "";
// export const googleClientID =
//   "848748076664-36afplhk52csacfeep0duoe10c1pj092.apps.googleusercontent.com";
// export const googleClientSecret = "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";
if (process.env.NODE_ENV == "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
