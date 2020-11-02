import { Document } from 'mongoose'

export interface User extends Document  {
  readonly _id: string
  readonly username: string
  readonly password: string
  readonly email: string
  readonly registrationDate: string
  readonly bdayDay: string
  readonly notifications: [{
    task: {
      // task params
    },
    project: {
      // project params
    }
  }]
  readonly isEmailConfirmed: boolean
}