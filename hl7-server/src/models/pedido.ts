//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
//class
import { Doente } from './doente';
import { Consulta } from './consulta';
import { AtoMedico } from './ato_medico';

@Entity('Pedido')
export class Pedido extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'numero_pedido' })
    numero_pedido: Number;

    @Column({ name: 'data_hora', type: 'datetime' })
    data_hora: Date;

    @OneToOne(type => Consulta, { eager: true })
    @JoinColumn()
    consulta: Consulta;

    @OneToOne(type => Consulta, { eager: true })
    @JoinColumn()
    doente: Doente;

    @OneToOne(type => Consulta, { eager: true })
    @JoinColumn()
    ato_medico: AtoMedico;
}