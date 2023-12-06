import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from 'src/user/user.pb';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ClientsModule.register([
    {
      name: 'User',
      transport: Transport.GRPC,
      options: {
        url: process.env.USER_GRPC_URL,
        package: protobufPackage,
        protoPath: join('node_modules/protos/proto/user.proto')
      },
    },
  ]),],
  providers: [UserResolver],
})
export class UserModule {}