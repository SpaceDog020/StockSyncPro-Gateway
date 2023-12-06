import { Inject, OnModuleInit } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { UserServiceClient } from './user.pb';

@Resolver('User')
export class UserResolver implements OnModuleInit {
    private userService: UserServiceClient;
    constructor(@Inject('User') private client: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>('UserService');
    }

    
}