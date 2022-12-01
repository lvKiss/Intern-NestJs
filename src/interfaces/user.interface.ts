import {  IsAlpha, IsEmail, IsOptional} from "class-validator";
export class User{
    id :number;

    @IsOptional()	
    @IsAlpha()	
    username?: string;
    
    @IsOptional()	
    @IsAlpha()	
    lastname?: string;

    @IsOptional()	
    @IsAlpha()
    fistname?:string;

    @IsOptional()	
    @IsEmail()
    email?: string;

    password?: string;	

    createAt: Date;

    updateAt: Date;
    static email: any;
    static lastname: any;
}