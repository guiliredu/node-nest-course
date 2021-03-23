import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
    private addresses: Address[] = [{
        id: 1,
        cep: 96030480,
        address: 'Rua Um',
        city: 'Pelotas',
        state: 'RS',
    }];

    findAll() {
        return this.addresses;
    }

    findOne(id: number) {
        const address = this.addresses.find(item => item.id === +id);

        if (!address) {
            throw new NotFoundException(`Endereço ${id} não encontrado`);
        }

        return address;
    }

    create(createCoffeeDto: any) {
        this.addresses.push(createCoffeeDto);
    }

    update(id: number, updateCoffeeDto: any) {
        const address = this.findOne(id);

        if (address) {
            // update the existing entity
        }
    }

    remove(id: number) {
        const coffeeIndex = this.addresses.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
            this.addresses.splice(coffeeIndex, 1);
        }
    }
}
