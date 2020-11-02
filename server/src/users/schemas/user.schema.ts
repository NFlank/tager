import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
	password: {
    type: String,
    required: true
  },
	email: String,
	registrationDate: {
    type: String,
    default: new Date()
  },
	bdayDay: {
    type: String
  }, 
	notifications: [{
		task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task' 
    },
		project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
		isChecked: Boolean
	}],
	isEmailConfirmed: {
    type: Boolean,
    default: false
  }
})