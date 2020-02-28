//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('AtoMedico')
export class AtoMedico extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'identificador' })
    id: Number;

    @Column({ name: 'ato' })
    ato: String;
}