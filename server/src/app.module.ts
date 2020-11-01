import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb+srv://usertager:usertager@cluster0.o5e2x.mongodb.net/tager?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }),
    TasksModule
  ],
  // controllers: [TasksController],
  // providers: [TasksService],
})

export class AppModule {}
