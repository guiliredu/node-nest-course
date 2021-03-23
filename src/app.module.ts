import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AddressModule, 
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: `@src/../database/db.sqlite`,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
