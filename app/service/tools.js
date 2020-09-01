'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

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
}

module.exports = ToolsService;
