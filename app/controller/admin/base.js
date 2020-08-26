const Controller = require('egg').Controller;

class LoginController extends Controller {
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
}

module.exports = LoginController;
