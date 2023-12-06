import { Inject, OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { ProductServiceClient } from './product.pb';

@Resolver('Product')
export class ProductResolver implements OnModuleInit {
    private productService: ProductServiceClient;
    constructor(@Inject('Product') private client: ClientGrpc) {}

    onModuleInit() {
        this.productService = this.client.getService<ProductServiceClient>('ProductService');
    }

    
}