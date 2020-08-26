'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    await this.ctx.render(
      `admin/manager/index`,
      {
        username: 'Brendan Eich',
      }
    )
  }

  async add() {
    await this.ctx.render(`admin/manager/add`)
  }

  async edit() {
    await this.ctx.render(`admin/manager/edit`)
  }

  async delete() {
    this.ctx.body = `<h1>manager delete....</h1>`
  }
}

module.exports = ManagerController;
