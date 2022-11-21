import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { User } from "src/interfaces/user.interface";
import { UserService } from "src/services/user.service";
import { DeleteResult, UpdateResult } from "typeorm";


@Controller('user')
export class UserController{
    constructor(private userService: UserService){}
    @Post()
    create(@Body() user: User): Promise<User>{
        return this.userService.createUser(user)
    }

    @Get()
    get(){
        return this.userService.getUser()
    }

    @Get(':id')
    getId(@Param('id') param:number):Promise<User>{
        return this.userService.getUserId(param);
    }

    @Put('update')
    UpdateMany(@Body() request:Array<User>){
        return this.userService.updateMultiple(request);
    }

    @Put(':id')
    Update(@Param('id') param:number, @Body() user:User): Promise<UpdateResult>{
        return this.userService.update(param,user);
    }

    @Delete('delete')   
    DeleteMany(@Body() request :Array<number>):Promise<DeleteResult>{
        return this.userService.deleteMultiple(request)
    }

    @Delete(':id')
    Delete(@Param('id') param: number):Promise<DeleteResult>{
        return this.userService.delete(param)
    }
}