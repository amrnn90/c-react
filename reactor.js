const path = require("path");
const run = require("@amrnn/reactor");

const options = {
  /** source path */
  srcPath: path.join(__dirname, "frontend"),

  /** output path (Must be absolute) */
  outputAbsPath: path.resolve(__dirname, "public"),

  /** name for js bundle */
  jsBundleName: "admin.js",

  /** name for css bundle */
  cssBundleName: "admin.css",

  /** entry file (relative to srcPath) */
  entry: "index.js",

  /** index template used by HtmlWebPackPlugin (relative to srcPath) */
  indexTemplate: null,

  /** path for files that should just get copied to output (relative to srcPath) */
  staticPath: "static",

  /** proxies: each item is an array of: [from, target] */
  proxies: [["*", "http://localhost:8000"]]
};

run(options);
