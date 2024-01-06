import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { config } from './../config';



import { ConfigType } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync(
      {
        inject: [config.KEY],
        useFactory: (configService: ConfigType<typeof config>) => {
          return {
            secret: config().jwtSecret,
            signOptions: { expiresIn: '10d' },
          };
        }
      }
    ),
    PassportModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
