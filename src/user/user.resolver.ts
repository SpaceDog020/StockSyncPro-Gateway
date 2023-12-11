import { Body, Inject, OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { CredentialsRequest, LoginUserResponse, RegisterUserResponse, UserServiceClient } from './user.pb';

@Resolver('User')
export class UserResolver implements OnModuleInit {
    private userService: UserServiceClient;
    constructor(@Inject('User') private client: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>('UserService');
    }
    
    @Mutation('register')
    register(@Args('request') request: CredentialsRequest): Observable<RegisterUserResponse> {
      return this.userService.register(request);
    }

    @Query('login')
    login(@Args('request') request: CredentialsRequest): Observable<LoginUserResponse> {  
      return this.userService.login(request);
    }
}