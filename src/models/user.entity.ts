import { Exclude } from "class-transformer";
import Role from "src/role/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ orderBy: { id: "ASC" } })
export class UserEntity{
    @PrimaryGeneratedColumn()
    
    id:number;

    @Column()
    username: string

    @Column()
    lastname: string;

    @Column()
    fistname: string;
	
    @Column()
    email: string

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
      })
    role: Role

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    updateAt: Date;
}