import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user.controller";
import { UserEntity } from "src/models/user.entity";
import { UserService } from "src/services/user.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers:[UserService],
    controllers: [UserController]
})
export class Usermodule{}