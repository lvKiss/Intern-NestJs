import { Exclude } from "@nestjs/class-transformer";
import { User } from "src/interfaces/user.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ orderBy: { id: "ASC" } })
export class UserEntity{
    @PrimaryGeneratedColumn()
    
    id:number;

    @Column()
    lastname: string;

    @Column()
    fistname: string;
	
    @Column()
    email: string

    @Column({ select: false })
    @Exclude({ toPlainOnly: true })
    password: string

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    updateAt: Date;
}