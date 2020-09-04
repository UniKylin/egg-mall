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
    await this.ctx.model.Role.updateOne(
      { _id: id },
      { title, description },
    )
    await this.success('/admin/role', '编辑角色成功')
  }

  async delete() {
    this.ctx.body = `<h1>role delete....</h1>`
  }

  async auth() {
    const { roleId } = this.ctx.query
    console.log(`---> role id: ${roleId}`)

    const list = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        }
      },
      {
        $match: {
          module_id: '0',
        }
      }
    ])
    console.log(list)

    await this.ctx.render(`admin/role/auth`, {
      roleId, list,
    })
  }

  async doAuth() {
    console.log(this.ctx.request.body)
    const { role_id, access_node } = this.ctx.request.body

    // 1. 先清除当前角色权限'
    const roleId = this.app.mongoose.Types.ObjectId(role_id)
    await this.ctx.model.RoleAccess.deleteMany({ role_id: roleId })

    // 2. 保存选中权限
    for (let i = 0; i < access_node.length; i++) {
      const roleAccess = this.ctx.model.RoleAccess({
        role_id,
        access_id: access_node[i],
      })
      await roleAccess.save()
    }

    await this.success(`/admin/role/auth?roleId=${role_id}`, '授权成功')
  }
}

module.exports = RoleController;
