//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';

@Entity('Worklist')
export class Worklist extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'numero_pedido' })
    id: Number;

    pedido_id: Number;

    
}