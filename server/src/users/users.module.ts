import { Module } from '@nestjs/common'
import { UserSchema } from './schemas/user.schema'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
