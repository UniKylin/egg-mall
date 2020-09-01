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
    console.log(`username---> ${username} ---> ${password} ---> ${code}`)
  }
}

module.exports = LoginController;
