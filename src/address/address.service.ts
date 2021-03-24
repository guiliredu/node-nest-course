import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) {}

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;

        return this.addressRepository.find({
            relations: ['city'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: number) {
        const address = await this.addressRepository.findOne(id);

        if (!address) {
            throw new NotFoundException(`Endereço ${id} não encontrado`);
        }

        return address;
    }

    async create(CreateAddressDto: CreateAddressDto) {
        const city = await this.preloadCityByName(CreateAddressDto.city);

        const address = this.addressRepository.create({
            ...CreateAddressDto,
            city
        });

        return this.addressRepository.save(address);
    }

    async update(id: number, UpdateAddressDto: UpdateAddressDto) {
        const city = UpdateAddressDto.city && await this.preloadCityByName(UpdateAddressDto.city);

        const address = await this.addressRepository.preload({
            id: +id,
            ...UpdateAddressDto,
            city
        });

        if (!address) {
            throw new NotFoundException(`Endereço ${id} não encontrado`);
        }

        return this.addressRepository.save(address);
    }

    async remove(id: number) {
        const address = await this.addressRepository.findOne(id);

        if (!address) {
            throw new NotFoundException(`Endereço ${id} não encontrado`);
        }

        return this.addressRepository.remove(address);
    }

    private async preloadCityByName(name: string): Promise<City> {
        const existingCity = await this.cityRepository.findOne({ name });

        if (existingCity) {
          return existingCity;
        }

        return this.cityRepository.create({ name });
      }
}