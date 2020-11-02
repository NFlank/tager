export class CreateUserDTO {
  username: string
  password: string
  email?: string
  bdayDay?: string
  notifications?: [{
    task: {
      _id: string
    },
    project: {
      _id: string
    }
  }]
  isEmailConfirmed?: boolean
}