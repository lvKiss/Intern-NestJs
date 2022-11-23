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
        try {
            return await this.UserReponsitory.save(user);
        } catch (error) {
            return error
        }
    }}

    async getUser(): Promise<User[]>{
        try {
            return await this.UserReponsitory.find();
        } catch (error) {
            return error
        }
    }

    async getUserId(id : number): Promise<User>{
        try {
            return await this.UserReponsitory.findOneBy({id});
        } catch (error) {
            return error
        }
    }

    async update(id:number,user :User){
        try {
            user.updateAt= new Date();
            await this.UserReponsitory.update(id,user)
            return this.getUserId(id);
        } catch (error) {
            return error
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

    async delete(id:number): Promise<DeleteResult>{
        try {
            return await this.UserReponsitory.delete(id)
        } catch (error) {
            return error
        }
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