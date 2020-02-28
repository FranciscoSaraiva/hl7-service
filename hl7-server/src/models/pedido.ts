//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, RelationId } from 'typeorm';
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

    @RelationId((pedido: Pedido) => pedido.consulta)
    consulta: Consulta;

    @RelationId((pedido: Pedido) => pedido.doente)
    doente: Doente;

    @RelationId((pedido: Pedido) => pedido.ato_medico)
    ato_medico: AtoMedico;
}