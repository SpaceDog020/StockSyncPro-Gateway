import { Inject, OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { Warehouse, AllWarehouseResponse, WarehouseServiceClient, WarehouseResponse } from 'src/warehouse/warehouse.pb';

@Resolver('Warehouse')
export class WarehouseResolver implements OnModuleInit {
  private warehouseService: WarehouseServiceClient;
  constructor(@Inject('Warehouse') private client: ClientGrpc) {}

  onModuleInit() {
    this.warehouseService = this.client.getService<WarehouseServiceClient>('WarehouseService');
  }

  @Query('getAllWH')
  getAllWarehouses(): Observable<AllWarehouseResponse> {
    console.log('getAllWH');
    const request = {};
    return this.warehouseService.getAllWh(request);
  }

  @Query('getWH')
  getWarehouse(@Args('id') id: number): Observable<WarehouseResponse> {
    const request = { id };
    return this.warehouseService.getWh(request);
  }
}