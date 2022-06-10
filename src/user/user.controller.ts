import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import {CreateUserDTO} from './dto/user.dto'
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService ){}

    @Post('/register')
    async register(@Res() res, @Body() createUserDTO: CreateUserDTO): Promise<CreateUserDTO> {
        const user = await this.userService.register(createUserDTO) ;
        return res.status(201).json({
            user
        })
    }
    @Post('/login')
    async login(@Res() res, @Body('email') email:string, @Body('password') password:string ):Promise<any>{
        const loginUser = await this.userService.login(email,password);
        return res.status(200).json({
            loginUser
        })
    }

    @Get()
    async getAll(): Promise<CreateUserDTO[]>{
        return  await this.userService.getAll();
    }

    @Get(':id')
    async getBy(@Param('id') id:string):Promise<CreateUserDTO>{
        return this.userService.getById(id);
    }
    @Put(':id')
    async updateUser(@Param('id') id:string, @Body()createUserDTO: CreateUserDTO):Promise<CreateUserDTO>{
        return await this.userService.updateUser(id, createUserDTO);
    }

}
