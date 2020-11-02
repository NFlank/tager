import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.fgigj.mongodb.net/test?retryWrites=true&w=majority`),
    UsersModule
  ]
})

export class AppModule {}
