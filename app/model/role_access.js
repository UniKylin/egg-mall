module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const RoleAccessSchema = new Schema({
    role_id: {
      type: Schema.Types.ObjectId,
    },
    access_id: {
      type: Schema.Types.ObjectId,
    },

    add_time: {
      type: Number,
      default: new Date().getTime(),
    },
  })

  return mongoose.model('RoleAccess', RoleAccessSchema, 'role_access')
}