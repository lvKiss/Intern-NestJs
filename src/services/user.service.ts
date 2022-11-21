import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/models/user.entity";
import { User } from "src/interfaces/user.interface";
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
@Injectable() 
export class UserService{
    constructor (
    @InjectRepository(UserEntity)
    private readonly UserReponsitory: Repository<UserEntity>
    ){}

    async createUser(user: User): Promise<User>{{
        return await this.UserReponsitory.save(user);
    }}

    async getUser(): Promise<User[]>{
        return this.UserReponsitory.find();
    }

    async getUserId(id : number): Promise<User>{
        return this.UserReponsitory.findOneBy({id});
    }

    async update(id:number,user :User): Promise<UpdateResult>{
        user.updateAt= new Date();
        return await this.UserReponsitory.update(id,user)
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

    async delete(id:number): Promise<DeleteResult>{
        return await this.UserReponsitory.delete(id)
    }
    
    async deleteMultiple(id: Array<number>): Promise<DeleteResult>{
        try {
            for(var item of id){
                await this.delete(item)
            }
        } catch (error) {
            return error;
        }   
    }

   
}