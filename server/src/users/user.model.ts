import * as mongoose from 'mongoose'

export const TaskResponseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
	password: {
    type: String,
    required: true
  },
	email: {
    type: String,
    required: true
  },
	registrationDate: {
    type: String,
    required: true
  },
	bdayDay: {
    type: String
  }, 
	notifications: [{
		Task: {
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
    required: true
  }
})