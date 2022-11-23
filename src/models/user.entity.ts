import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ orderBy: { id: "ASC" } })
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:''})
    lastname: string;

    @Column({default:''})
    fistname: string;

    @Column({default:''})
    email: string

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    updateAt: Date;
}