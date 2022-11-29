import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseInterceptors } from "@nestjs/common";
import { User } from "src/interfaces/user.interface";
import { UserService } from "src/services/user.service";



@Controller('user')
export class UserController{
    constructor(private userService: UserService){}
    @Post()
    create(@Body() user: User): Promise<User>{
      return this.userService.createUser(user)
    }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    get() : Promise<User[]>{
        return this.userService.getUser()
    }

    @Get(':id')
    async getId(@Param('id',ParseIntPipe) id:number){
        
        return this.userService.getUserId(id);

    }

    @Put('update')
    UpdateMany(@Body() request:Array<User>){
        return this.userService.updateMultiple(request);
    }

    @Put(':id')
    async Update(@Param('id',ParseIntPipe) id:number, @Body() user:User){
       return await this.userService.update(id,user)   
    }

    @Delete('delete')   
    DeleteMany(@Body() request :Array<number>){
        return this.userService.deleteMultiple(request)
    }

    @Delete(':id')
    async Delete(@Param('id',ParseIntPipe) param: number){
        return await this.userService.delete(param)
    }
}