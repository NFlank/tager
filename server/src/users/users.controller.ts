import { UsersService } from './users.service'
import { Controller, Post, Body } from '@nestjs/common'
import { User } from './interfaces/user.interface'

type UserControllerResponse = {
  success: boolean
  user?: User
  error?: string
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<UserControllerResponse> {
    const serviceResponse = await this.usersService.register({username, password})
  
    if (serviceResponse.error) {
      return {success: false, error: serviceResponse.error}
    }

    return {success: true, user: serviceResponse.user}    
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<UserControllerResponse> {
    const serviceResponse = await this.usersService.login({username, password})
  
    if (serviceResponse.error) {
      return {success: false, error: serviceResponse.error}
    }

    return {success: true, user: serviceResponse.user}    
  }


  @Post('change-username')
  async changeUsername(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('newUsername') newUsername: string
  ): Promise<UserControllerResponse> {
    const serviceResponse = await this.usersService.changeUsername({username, password}, newUsername)
  
    if (serviceResponse.error) {
      return {success: false, error: serviceResponse.error}
    }

    return {success: true, user: serviceResponse.user}    
  }
}
