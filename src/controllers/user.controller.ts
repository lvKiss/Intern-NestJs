import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User } from "src/interfaces/user.interface";
import Role from "src/role/role.enum";
import RoleGuard from "src/role/role.guard";
import { UserService } from "src/services/user.service";



@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController{
    constructor(private userService: UserService){}
    @Post()
    @UseGuards(RoleGuard(Role.Admin))
    create(@Body() user: User): Promise<User>{
      return this.userService.createUser(user)
    }
    
   
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
    @UseGuards(RoleGuard(Role.Admin))
    DeleteMany(@Body() request :Array<number>){
        return this.userService.deleteMultiple(request)
    }

    @Delete(':id')
    @UseGuards(RoleGuard(Role.Admin))
    async Delete(@Param('id',ParseIntPipe) param: number){
        return await this.userService.delete(param)
    }
}