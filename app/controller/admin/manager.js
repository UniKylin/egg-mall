'use strict';

const BaseController = require('./base')

class ManagerController extends BaseController {
  async index() {
    const adminList = await this.ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        }
      }
    ])
    console.log(adminList)
    await this.ctx.render(`admin/manager/index`, { adminList })
  }

  async add() {
    const roleList = await this.ctx.model.Role.find()
    console.log(roleList)
    await this.ctx.render(`admin/manager/add`, { roleList })
  }

  async doAdd() {
    const admin = this.ctx.request.body
    const existAdmin = await this.ctx.model.Admin.find({ username: admin.username })
    admin.password = await this.service.tools.encodeMd5(admin.password)

    console.log(`------`)
    console.log(existAdmin)
    if (existAdmin && existAdmin.length > 0) {
      await this.error('/admin/manager', `管理员: ${admin.username} 已经存在了`)
    } else {
      console.log(admin)
      await this.ctx.model.Admin(admin).save()
      await this.success('/admin/manager', `管理员添加成功`)
    }
  }

  async edit() {
    const { _id } = this.ctx.request.query
    const adminList = await this.ctx.model.Admin.find({ _id })
    const roleList = await this.ctx.model.Role.find()

    console.log(adminList[0])
    console.log(roleList)

    await this.ctx.render(`admin/manager/edit`, {
      roleList,
      admin: adminList[0],
    })
  }

  async doEdit() {
    console.log(this.ctx.request.body)
    const { _id, password, email, mobile, role_id } = this.ctx.request.body
    if (password) {
      const encodePassword = await this.ctx.service.tools.encodeMd5(password)
      await this.ctx.model.Admin.updateOne({ _id }, {
        email,
        mobile,
        role_id,
        password: encodePassword,
      })
    } else {
      await this.ctx.model.Admin.updateOne({ _id }, {
        email,
        mobile,
        role_id,
      })
    }
    await this.success('/admin/manager', '编辑管理员成功')
  }

  async delete() {
    this.ctx.body = `<h1>manager delete....</h1>`
  }
}

module.exports = ManagerController;
