import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entity';

@Module({ 
    imports: [TypeOrmModule.forFeature([Address, City])],
    controllers: [AddressController], 
    providers: [AddressService] 
})
export class AddressModule {}