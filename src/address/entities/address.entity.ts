import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cep: number;

    @Column()
    address: string;

    @ManyToOne(type => City, city => city.addresses, {
        cascade: true,
    })
    city: City;
    
    @Column()
    state: string;
}