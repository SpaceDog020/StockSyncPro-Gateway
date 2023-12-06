import { Module } from '@nestjs/common';
import { WarehouseResolver } from './warehouse.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from 'src/warehouse/warehouse.pb';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ClientsModule.register([
    {
      name: 'Warehouse',
      transport: Transport.GRPC,
      options: {
        url: process.env.WAREHOUSE_GRPC_URL,
        package: protobufPackage,
        protoPath: join('node_modules/protos/proto/warehouse.proto')
      },
    },
  ]),],
  providers: [WarehouseResolver],
})
export class WarehouseModule {}