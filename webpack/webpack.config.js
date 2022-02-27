const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}`);
  const config = merge(common, envConfig);

  return config;
};
