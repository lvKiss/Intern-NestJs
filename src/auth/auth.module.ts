import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { Usermodule } from 'src/modules/user.module';
import { UserService } from 'src/services/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,Usermodule,
    JwtModule.register({
      secret: 'long',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,UserService],
  exports:[AuthService,JwtStrategy]
})
export class AuthModule {}
