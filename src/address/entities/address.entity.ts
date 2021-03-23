import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cep: number;

    @Column()
    address: string;

    @Column()
    city: string;
    
    @Column()
    state: string;
}