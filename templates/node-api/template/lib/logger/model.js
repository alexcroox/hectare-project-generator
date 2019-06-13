const mongoose = require('mongoose')

const LogSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    data: {
      type: mongoose.Mixed
    },
    message: {
      type: String
    }
  },
  {
    timestamps: true,
    minimize: false,
    strict: false
  }
)

module.exports = mongoose.model('Log', LogSchema)
