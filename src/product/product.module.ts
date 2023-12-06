import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from 'src/product/product.pb';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ClientsModule.register([
    {
      name: 'Product',
      transport: Transport.GRPC,
      options: {
        url: process.env.PRODUCT_GRPC_URL,
        package: protobufPackage,
        protoPath: join('node_modules/protos/proto/product.proto')
      },
    },
  ]),],
  providers: [ProductResolver],
})
export class ProductModule {}