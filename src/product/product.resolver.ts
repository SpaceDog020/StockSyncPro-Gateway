import { Inject, OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { AddProductRequest, AddProductResponse, DeleteProductByIdRequest, DeleteProductByIdResponse, GetAllProductsResponse, ProductServiceClient, UpdateProductRequest, UpdateProductResponse, getProductByIdRequest, getProductByIdResponse } from './product.pb';

@Resolver('Product')
export class ProductResolver implements OnModuleInit {
    private productService: ProductServiceClient;
    constructor(@Inject('Product') private client: ClientGrpc) {}

    onModuleInit() {
        this.productService = this.client.getService<ProductServiceClient>('ProductService');
    }

    @Query('getAllProducts')
    getAllProducts(): Observable<GetAllProductsResponse> {
        console.log('[.] getAllProducts');
        const request = {};
        return this.productService.getAllProducts(request);
    }

    @Query('getProductById')
    getProductById(@Args('input') input: getProductByIdRequest): Observable<getProductByIdResponse> {
        console.log('[.] getProductById');
        return this.productService.getProductById(input);
    }

    @Mutation('addProduct')
    addProduct(@Args('input') input: AddProductRequest): Observable<AddProductResponse> {
        console.log('[.] addProduct');
        return this.productService.addProduct(input);
    }

    @Mutation('deleteProduct')
    deleteProduct(@Args('input') input: DeleteProductByIdRequest): Observable<DeleteProductByIdResponse> {
        console.log('[.] deleteProduct');
        return this.productService.deleteProductById(input);
    }    

    @Mutation('updateProduct')
    updateProduct(@Args('input') input: UpdateProductRequest): Observable<UpdateProductResponse> {
        console.log('[.] updateProduct');
        return this.productService.updateProduct(input);
    }    

}