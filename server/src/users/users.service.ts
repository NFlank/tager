import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'

type UserSreviceResponse = {
  user?: User
  error?: string
}

export type loginData = {
  username: string
  password: string
}
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async register(createUserDTO: CreateUserDTO): Promise<UserSreviceResponse> {
    if (createUserDTO.username.length < 4) {
      return {error: 'Username length must be at least 4 character'}
    }

    const isUsernameTaken = await this.userModel.findOne({username: createUserDTO.username})

    if (isUsernameTaken) {
      return {error: 'User with this username already exist'}
    }

    if (createUserDTO.password.length < 8) {
      return {error: 'Password length must be at least 8 character'}
    }
    
    const hasedPassword = await bcrypt.hash(createUserDTO.password, 10)
    createUserDTO.password = hasedPassword

    const newUser = new this.userModel(createUserDTO)

    return {user: await newUser.save()}
  }

  async login(loginData: loginData): Promise<UserSreviceResponse> {
    if (loginData.username.length < 4) {
      return {error: 'Username length must be at least 4 character'}
    }

    const isUserExist = await this.userModel.findOne({username: loginData.username}).exec()

    if (!isUserExist) {
      return {error: 'User with this username doesn`t exist'}
    }

    if (loginData.password.length < 8) {
      return {error: 'Password length must be at least 8 character'}
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, isUserExist.password)

    if (!isPasswordValid) {
      return {error: 'Password is wrong'}
    }

    return {user: isUserExist}
  }

  async changeUsername(loginData: loginData, newUsername: string): Promise<UserSreviceResponse> {
    if (newUsername.length < 4) {
      return {error: 'Username length must be at least 4 character'}
    }

    const user = await this.userModel.findOne({username: loginData.username})

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password)

    if (!isPasswordValid) {
      return {error: 'Password is wrong'}
    }

    await this.userModel.findOneAndUpdate({username: loginData.username}, {username: newUsername})

    const updatedUser = await this.userModel.findOne({username: newUsername})
    return {user: updatedUser}    
  }
}
