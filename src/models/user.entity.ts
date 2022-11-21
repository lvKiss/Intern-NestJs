import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
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

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP',onUpdate: "CURRENT_TIMESTAMP(6)"})
    updateAt: Date;
}