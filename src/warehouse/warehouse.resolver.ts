import { Inject, OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { Warehouse, AllWarehouseResponse, WarehouseServiceClient, WarehouseResponse, WarehouseRequest, CreateWarehouseRequest, ProductWHRequest, ProductWHResponse, DeleteProductWHRequest, UpdateWarehouseRequest, AllProductWHRequest, AllProductWHResponse } from 'src/warehouse/warehouse.pb';

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

  @Query('getAllProductWh')
  getAllProductWh(@Args('input') input: AllProductWHRequest): Observable<AllProductWHResponse> {
    console.log('[.] getAllProductWh');
    return this.warehouseService.getAllProductWh(input);
  }

  @Mutation('addWh')
  addWh(@Args('input') input: CreateWarehouseRequest): Observable<WarehouseResponse> {
    console.log('[.] addWh');
    return this.warehouseService.addWh(input);
  }

  @Mutation('addProductToWh')
  addProductToWh(@Args('input') input: ProductWHRequest): Observable<ProductWHResponse> {
    console.log('[.] addProductToWh');
    return this.warehouseService.addProductToWh(input);
  }

  @Mutation('deleteProductWh')
  deleteProductWh(@Args('input') input: DeleteProductWHRequest): Observable<ProductWHResponse> {
    console.log('[.] deleteProductWh');
    return this.warehouseService.deleteProductWh(input);
  }

  @Mutation('updateWh')
  updateWh(@Args('input') input: UpdateWarehouseRequest): Observable<WarehouseResponse> {
    console.log('[.] updateWh');
    return this.warehouseService.updateWh(input);
  }

  @Mutation('updateStock')
  updateStock(@Args('input') input: ProductWHRequest): Observable<ProductWHResponse> {
    console.log('[.] updateStock');
    return this.warehouseService.updateStock(input);
  }
}