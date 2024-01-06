import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; // Asegúrate de importar MongooseModule
import { MongoClient } from 'mongodb';
import { config }  from './../config';


@Global()
@Module({
    imports: [MongooseModule.forRootAsync({
        useFactory: (configService: ConfigType<typeof config>) => {
            const {
                user,
                password,
                host,
                port,
                dbName,
            } = configService.database;
          return {
            uri: `mongodb://${host}:${port}`,
            user,
            pass: password,
            dbName,
          };
        },
        inject: [config.KEY],
      })], 
    providers: [
        {
        provide: 'MONGO',
        useFactory: async (configService: ConfigType<typeof config>) => {
            const {
                user,
                password,
                host,
                port,
                dbName,
              } = configService.database;
            const uri = `mongodb://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
            const client = await MongoClient.connect(uri);
            return client.db(dbName);
        },
        inject: [config.KEY],
        },
        
    ],
    exports: ['MONGO', MongooseModule], 
})
export class DatabaseModule {}
