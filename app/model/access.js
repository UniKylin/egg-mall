module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const AccessSchema = new Schema({
    // 模块名称
    module_name: {
      type: String,
    },

    // 操作名称
    action_name: {
      type: String,
    },

    // 1. 模块  2. 菜单  3. 操作
    type: {
      type: String,
    },

    // 链接地址
    url: {
      type: String,
    },

    // 此 module_id 和当前模型的 _id 关联，其实可以理解为自关联，只是用两个字段来维持两者的关系
    module_id: {
      type: Schema.Types.Mixed,
    },

    // 排序字段
    sort: {
      type: Number,
      default: 100,
    },

    description: {
      type: String,
    },

    status: {
      type: Number,
      default: 1,
    },

    add_time: {
      type: Number,
      default: new Date().getTime(),
    },
  })

  return mongoose.model('Access', AccessSchema, 'access')
}