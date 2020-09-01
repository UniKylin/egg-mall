'use strict';

const BaseController = require('./base')

class RoleController extends BaseController {
  async index() {
    await this.ctx.render(`admin/role/index`)
  }

  async add() {
    await this.ctx.render(`admin/role/add`)
  }

  async doAdd() {
    console.log(this.ctx.request.body)
    const { title, description } = this.ctx.request.body

    const role = this.ctx.model.Role({
      title, description,
    })
    const result = await role.save()
    console.log(result)
    // TODO: how to define add role success
    await this.success('/admin/role', '添加角色成功')
  }

  async edit() {
    await this.ctx.render(`admin/role/edit`)
  }

  async delete() {
    this.ctx.body = `<h1>role delete....</h1>`
  }
}

module.exports = RoleController;
