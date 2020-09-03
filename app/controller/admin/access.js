'use strict';

const BaseController = require('./base')

class AccessController extends BaseController {
  async index() {
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

    await this.ctx.render(`admin/access/index`, {
      list,
    })
  }

  async add() {
    const moduleList = await this.ctx.model.Access.find({ module_id: '0' })
    await this.ctx.render(`admin/access/add`, {
      moduleList,
    })
  }

  async doAdd() {
    console.log(this.ctx.request.body)
    const accessData = this.ctx.request.body
    const { module_id } = this.ctx.request.body

    // 引用节点 id 转换
    if (module_id !== '0') {
      accessData.module_id = this.app.mongoose.Types.ObjectId(module_id)
    }

    const access = this.ctx.model.Access(accessData)
    await access.save()
    await this.success('/admin/access', '权限添加成功')
  }

  async edit() {
    await this.ctx.render(`admin/access/edit`)
  }

  async doEdit() {
    await this.ctx.render(`admin/access/add`)
  }

}

module.exports = AccessController;
