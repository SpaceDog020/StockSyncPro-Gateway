import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { WarehouseModule } from './warehouse/warehouse.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
      playground: {
        settings: {
          "editor.theme": 'dark'
        }
      }
    }),
    UserModule,
    ProductModule,
    WarehouseModule
  ],
  providers: [],
})
export class AppModule {}