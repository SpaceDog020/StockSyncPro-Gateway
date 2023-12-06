import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from 'src/user/user.pb';

@Module({
  imports: [
    ClientsModule.register([
    {
      name: 'User',
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5003',
        package: protobufPackage,
        protoPath: join('node_modules/protos/proto/user.proto')
      },
    },
  ]),],
  providers: [UserResolver],
})
export class UserModule {}