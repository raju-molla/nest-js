import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserSchema} from './schemas/user.schema'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn:'1d'}
    }),
    
    MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema,
      
    }
  ])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
