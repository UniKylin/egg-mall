'use strict';

const BaseController = require('./base')


class LoginController extends BaseController {
  async index() {
    await this.ctx.render(`admin/login`)
  }

  async doLogin() {
    console.table(this.ctx.request.body)
    const { _csrf, username, password, code } = this.ctx.request.body
    const { code: sessionCode } = this.ctx.session
    const encodePassword = await this.service.tools.encodeMd5(password)

    if (code.toLowerCase() === sessionCode.toLowerCase()) {
      const result = await this.ctx.model.Admin.find({
        username,
        password: encodePassword,
      })
      console.table(result)

      if (result.length > 0) {
        this.ctx.session.userInfo = result[0]
        this.ctx.redirect('/admin/manager')
      } else {
        await this.error('/admin/login', '用户名或者密码错误...')
      }
    } else {
      await this.error('/admin/login', '验证码错误...')
    }

  }
}

module.exports = LoginController;
