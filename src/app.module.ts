import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { WarehouseModule } from './warehouse/warehouse.module';

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
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    WarehouseModule,
  ],
  providers: [],
})
export class AppModule {}