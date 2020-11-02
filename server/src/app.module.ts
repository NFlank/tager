import { Module } from '@nestjs/common'
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})

export class AppModule {}
