const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, message) {
    await this.ctx.render(
      `admin/common/success`,
      {
        redirectUrl,
        message: message || '操作成功',
      },
    )
  }

  async error(redirectUrl, message) {
    await this.ctx.render(
      `admin/common/error`,
      {
        redirectUrl,
        message: message || '操作失败',
      },
    )
  }

  async code() {
    const captcha = await this.service.tools.generateCaptcha()
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
}

module.exports = BaseController;
