import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
    ) {}

    findAll() {
        return this.addressRepository.find();
    }

    async findOne(id: number) {
        const address = await this.addressRepository.findOne(id);

        if (!address) {
            throw new NotFoundException(`Endereço ${id} não encontrado`);
        }

        return address;
    }

    create(createAddressDto: CreateAddressDto) {
        const address = this.addressRepository.create(createAddressDto);

        return this.addressRepository.save(address);
    }

    async update(id: number, UpdateAddressDto: UpdateAddressDto) {
        const address = await this.addressRepository.preload({
            id: +id,
            ...UpdateAddressDto,
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
}
