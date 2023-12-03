import { Inject, OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { Warehouse, AllWarehouseResponse, WarehouseServiceClient, WarehouseResponse, WarehouseRequest, CreateWarehouseRequest } from 'src/warehouse/warehouse.pb';

@Resolver('Warehouse')
export class WarehouseResolver implements OnModuleInit {
  private warehouseService: WarehouseServiceClient;
  constructor(@Inject('Warehouse') private client: ClientGrpc) {}

  onModuleInit() {
    this.warehouseService = this.client.getService<WarehouseServiceClient>('WarehouseService');
  }

  @Query('getAllWh')
  getAllWh(): Observable<AllWarehouseResponse> {
    console.log('[.] getAllWh');
    const request = {};
    return this.warehouseService.getAllWh(request);
  }

  @Query('getWh')
  getWh(@Args('input') input: WarehouseRequest): Observable<WarehouseResponse> {
    console.log('[.] getWh');
    return this.warehouseService.getWh(input);
  }

  @Mutation('addWh')
  addWh(@Args('input') input: CreateWarehouseRequest): Observable<WarehouseResponse> {
    console.log('[.] addWh');
    return this.warehouseService.addWh(input);
  }
}