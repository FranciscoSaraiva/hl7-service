//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Doente')
export class Doente extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'identificador' })
  identificador: Number;

  @Column({ name: 'numero_processo', type: 'number' })
  numero_processo: Number;

  @Column({ name: 'morada', type: 'varchar' })
  morada: String;

  @Column({ name: 'telefone', type: 'number' })
  telefone: Number;
}