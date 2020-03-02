//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Worklist')
export class Worklist extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'numero_pedido' })
    private id: Number;

    @Column({ name: 'pedido_id', type: 'int' })
    private pedido_id: Number;

    @Column({ name: 'estado', type: 'varchar' })
    private estado: String;

    constructor(pedido_id: Number) {
        super();
        this.pedido_id = pedido_id;
    }

    //Gets
    public GetId(): Number {
        return this.id;
    }

    public GetPedido_id(): Number {
        return this.pedido_id;
    }

    public GetEstado(): String {
        return this.estado;
    }

    //Sets
    public SetId(id: Number): void {
        this.id = id;
    }

    public SetPedido_id(pedido_id: Number): void {
        this.pedido_id = pedido_id;
    }

    public SetEstado(estado: String): void {
        this.estado = estado;
    }
}