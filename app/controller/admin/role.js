'use strict';

const BaseController = require('./base')

class RoleController extends BaseController {
  async index() {
    const list = await this.ctx.model.Role.find()
    console.log(list)
    await this.ctx.render(`admin/role/index`, { list })
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
    const { roleId } = this.ctx.query
    const role = await this.ctx.model.Role.find({ _id: roleId })
    await this.ctx.render(`admin/role/edit`, { role: role[0] })
  }

  async doEdit() {
    console.log(this.ctx.request.body)
    const { id, title, description } = this.ctx.request.body
    const result = await this.ctx.model.Role.updateOne(
      { _id: id },
      { title, description },
    )
    await this.success('/admin/role', '编辑角色成功')
  }

  async delete() {
    this.ctx.body = `<h1>role delete....</h1>`
  }
}

module.exports = RoleController;
