//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Worklist')
export class Worklist extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'numero_pedido' })
    private id: number;

    @Column({ name: 'pedido_id', type: 'int' })
    private pedido_id: number;

    @Column({ name: 'estado', type: 'varchar' })
    private estado: string;

    constructor(pedido_id: number) {
        super();
        this.pedido_id = pedido_id;
    }

    //Gets
    public GetId(): number {
        return this.id;
    }

    public GetPedido_id(): number {
        return this.pedido_id;
    }

    public GetEstado(): string {
        return this.estado;
    }

    //Sets
    public SetId(id: number): void {
        this.id = id;
    }

    public SetPedido_id(pedido_id: number): void {
        this.pedido_id = pedido_id;
    }

    public SetEstado(estado: string): void {
        this.estado = estado;
    }
}