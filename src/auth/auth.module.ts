import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '../member/member.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret'
    }),
    TypeOrmModule.forFeature([MemberEntity])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
