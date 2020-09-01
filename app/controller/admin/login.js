'use strict';

const BaseController = require('./base')


class LoginController extends BaseController {
  async index() {
    await this.ctx.render(`admin/login`)
  }

  async doLogin() {
    console.table(this.ctx.request.body)
    // await this.error(`/admin/login`)
    const { _csrf, username, password, code } = this.ctx.request.body
    const { code: sessionCode } = this.ctx.session
    const encodePassword = await this.service.tools.encodeMd5(password)
    console.log(`username---> ${username} ---> ${encodePassword} ---> ${code}`)
    console.log(`session code: ${sessionCode}`)

    if (code === sessionCode) {

    } else {
      await this.error('/admin/login', '验证码错误...')
    }

  }
}

module.exports = LoginController;
