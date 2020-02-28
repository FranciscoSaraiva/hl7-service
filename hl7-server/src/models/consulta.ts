//import
import { Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Consulta')
export class Consulta extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'identificador' })
    identificador: Number;
}