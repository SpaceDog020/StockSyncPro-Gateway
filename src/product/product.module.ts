import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from 'src/product/product.pb';

@Module({
  imports: [
    ClientsModule.register([
    {
      name: 'Product',
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5002',
        package: protobufPackage,
        protoPath: join('node_modules/protos/proto/product.proto')
      },
    },
  ]),],
  providers: [ProductResolver],
})
export class ProductModule {}