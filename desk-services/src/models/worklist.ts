import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Pedido } from './pedido';

@Entity('Worklist')
export class Worklist extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: number;

    @ManyToOne(type => Pedido, { eager: true, cascade: true })
    private pedido: Pedido;

    constructor(pedido: Pedido) {
        super();
        this.pedido = pedido;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getPedido(): Pedido {
        return this.pedido;
    }

    public setPedido(pedido: Pedido): void {
        this.pedido = pedido;
    }

}