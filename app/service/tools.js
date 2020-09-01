'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md5 = require('md5')

class ToolsService extends Service {
  /**
   * 生成验证码
   */
  async generateCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      height: 35,
    })
    this.ctx.session.code = captcha.text

    return captcha
  }

  async encodeMd5(str) {
    return md5(str)
  }
}

module.exports = ToolsService;
