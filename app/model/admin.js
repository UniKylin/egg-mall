module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const AdminSchema = new Schema({
    username: { type: String  },
    password: { type: String  },
    email: { type: String },
    mobile: { type: String },

    status: { type: Number, default: 1 },

    role_id: {
      type: Schema.Types.ObjectId,
    },

    add_time: {
      type: Number,
      default: new Date().getTime(),
    },

    is_super: {
      type: Number,
      default: 0, // 0: 超级管理员 1: 管理员 2: 一般用户
    }
  })

  return mongoose.model('Admin', AdminSchema, 'admin')
}