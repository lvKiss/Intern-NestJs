import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/local.strategy';
import { Usermodule } from './modules/user.module';

@Module({
  imports: [
    AuthModule, Usermodule,
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSSGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
