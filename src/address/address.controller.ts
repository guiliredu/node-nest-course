import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {

    }

    @Get()
    index(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.addressService.findAll();
    }

    @Get(':id')
    show(@Param('id') id: number) {
        console.log(typeof id);
        return this.addressService.findOne(id);
    }

    @Post()
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.addressService.create(createAddressDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateAddresDto: UpdateAddressDto) {
        return this.addressService.update(id, updateAddresDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.addressService.remove(id);
    }
}
