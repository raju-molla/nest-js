import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jsonWebTokenService: JwtService,
  ) {}

  async register(createUserDTO: CreateUserDTO): Promise<User> {
    let { password } = createUserDTO;
    let hashPassword = await bcrypt.hash(password, 10);
    createUserDTO.password = hashPassword;
    const user = new this.userModel(createUserDTO);
    const data = await user.save();
    return data;
  }

  async login(email: string, password: string): Promise<any> {
    // console.log(email, password);

    const user = await this.userModel.findOne({ email });
    if (!user) {
      return 'email invalied';
    }
    const hash = user.password;

    const isValiedPassword = await bcrypt.compare(password, hash);
    
    if (!isValiedPassword) {
      return 'password invalied';
    }
    let token = {
      email: user.email,
      userId: user._id,
    };

    return {
      token: this.jsonWebTokenService.sign(token),
    };
  }


  async getAll (): Promise<User[]>{
    const user = await this.userModel.find();
    return user
  }

  async getById(id:string):Promise<User>{
    const user = await this.userModel.findById({_id:id});
    return user
  }

  async updateUser(id:string,createUserDTO:CreateUserDTO):Promise<User>{
    const {password} = createUserDTO;
    
    let newPassword:string;
    if(password){
        newPassword = await bcrypt.hash(password,10);
        createUserDTO.password = newPassword
    }
    const user = await this.userModel.findByIdAndUpdate(id,createUserDTO,{
        new:true,
    });
    return user
    
  }


}
