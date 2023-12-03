import { Module } from '@nestjs/common';
import { WarehouseResolver } from './warehouse.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from 'src/warehouse/warehouse.pb';

@Module({
  imports: [
    ClientsModule.register([
    {
      name: 'Warehouse',
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5001',
      package: protobufPackage,
      protoPath: join('node_modules/protos/proto/warehouse.proto')
      },
    },
  ]),],
  providers: [WarehouseResolver],
})
export class WarehouseModule {}