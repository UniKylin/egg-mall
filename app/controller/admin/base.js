const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl) {
    await this.ctx.render(
      `admin/common/success`,
      { redirectUrl },
    )
  }

  async error(redirectUrl) {
    await this.ctx.render(
      `admin/common/error`,
      { redirectUrl },
    )
  }

  async code() {
    const captcha = await this.service.tools.generateCaptcha()
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
}

module.exports = BaseController;
