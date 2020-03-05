//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, JoinTable, PrimaryColumn } from 'typeorm';
//class
import { Consulta } from './consulta';

@Entity('Pedido')
export class Pedido extends BaseEntity {
    @PrimaryColumn({ name: 'numero_pedido', type: 'int' })
    private numero_pedido: number;

    @Column({ name: 'data_hora', type: 'datetime' })
    private data_hora: Date;

    @ManyToOne(type => Consulta, { eager: true, cascade: true })
    @JoinTable()
    private consulta: Consulta;

    @Column({ name: 'estado', type: 'boolean' })
    private estado: boolean;

    constructor(numero_pedido: number, consulta: Consulta) {
        super();
        this.numero_pedido = numero_pedido;
        this.data_hora = new Date();
        this.consulta = consulta;
        this.estado = false;
    }

    //Gets
    public GetNumero_Pedido(): number {
        return this.numero_pedido;
    }

    public GetData_hora(): Date {
        return this.data_hora;
    }

    public GetConsulta(): Consulta {
        return this.consulta;
    }

    public GetEstado(): boolean {
        return this.estado;
    }

    //Sets
    public SetNumero_Pedido(numero_pedido: number): void {
        this.numero_pedido = numero_pedido;
    }

    public SetData_hora(data_hora: Date): void {
        this.data_hora = data_hora;
    }

    public SetConsulta(consulta: Consulta): void {
        this.consulta = consulta;
    }

    public SetEstado(estado: boolean): void {
        this.estado = estado;
    }

}




