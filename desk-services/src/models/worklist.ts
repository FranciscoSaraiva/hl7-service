//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Worklist')
export class Worklist extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: number;

    @Column({ name: 'numero_pedido', type: 'int' })
    private numero_pedido: number;

    @Column({ name: 'numero_consulta', type: 'int' })
    private numero_consulta: number;

    constructor(pedido_id: number) {
        super();
        this.numero_pedido = pedido_id;
    }

    //Gets
    public GetId(): number {
        return this.id;
    }

    public GetNumero_pedido(): number {
        return this.numero_pedido;
    }

    public GetNumero_consulta(): number {
        return this.numero_consulta;
    }

    //Sets
    public SetId(id: number): void {
        this.id = id;
    }

    public SetNumero_pedido(numero_pedido: number): void {
        this.numero_pedido = numero_pedido;
    }

    public SetNumero_consulta(numero_consulta: number): void {
        this.numero_consulta = numero_consulta;
    }

}