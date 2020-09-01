/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598427906545_2149';

  // add your middleware config here
  config.middleware = ['adminauth'];

  config.adminauth = {
    match: '/admin'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  }

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/eggmall',
      options: {},
    }
  }

  return {
    ...config,
    ...userConfig,
  }
};
