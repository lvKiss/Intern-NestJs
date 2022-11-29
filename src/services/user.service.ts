import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/models/user.entity";
import { User } from "src/interfaces/user.interface";
import { Repository, UpdateResult} from 'typeorm';
import * as bcrypt from "bcrypt";
import { isInt, isNumber } from "class-validator";
@Injectable() 
export class UserService{
    constructor (
    @InjectRepository(UserEntity)//mid
    private readonly UserReponsitory: Repository<UserEntity>
    ){}

    async createUser(user: User): Promise<User>{{
        try {
            user.password = await bcrypt.hash(user.password, 10);
            return await this.UserReponsitory.save(user);
        } catch (error) {
            return error
        }
    }}
    
    async getUser(): Promise<User[]>{
        const users = await this.UserReponsitory.find()
        if(users.length!=0){
            return await this.UserReponsitory.find();   
        }else{
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        } 
    } 


    async getUserId(id : number){
        const user = await this.UserReponsitory.findOneBy({id})
        if(user == null){
            throw new HttpException('User not found '+ id, HttpStatus.NOT_FOUND);
        }else{
            return  user 
        }   
    }

    async update(id:number,user :User){
        const upd= await this.UserReponsitory.update(id,user)
        user.updateAt= new Date()
        if(upd.affected){
            throw new HttpException('User updated '+ id, HttpStatus.ACCEPTED);
        }else{
            throw new HttpException('User not found '+ id, HttpStatus.NOT_FOUND);
        }
    }

    async updateMultiple(list: Array<User>) : Promise<UpdateResult>{
        try {
            for(var item of list){
                item.updateAt= new Date();
                await this.update(item.id,item);
            }
        } catch (error) {
            return error;
        } 
    }

    async delete(id:number){
        const del= await this.UserReponsitory.delete(id)
            if(del.affected){
                throw new HttpException('User deleted '+id, HttpStatus.ACCEPTED);
            }else{
                throw new HttpException('User not found '+ id, HttpStatus.NOT_FOUND);
            }
    }
        
        

    
    async deleteMultiple(id: Array<number>){
        const list = []
        for(let item of id){
            if(isInt(item)){
                const user= await this.UserReponsitory.delete(item)
                if(user.affected){
                    list.push(new HttpException('User deleted ' + item, HttpStatus.OK));
                }   
            }
        }
        if(list.length!=0){
                return [{count:list.length}, list]
        }else{
            throw new HttpException('List Users not found ', HttpStatus.NOT_FOUND);  
        }
    }
}