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

    @Column({ name: 'estado_pedido', type: 'boolean' })
    private estado_pedido: boolean;

    @Column({ name: 'relatorio', type: 'varchar' })
    private relatorio: string;

    constructor(numero_pedido: number, numero_consulta: number) {
        super();
        this.numero_pedido = numero_pedido;
        this.numero_consulta = numero_consulta;
        this.estado_pedido = false;
        this.relatorio = '';
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

    public GetEstado_pedido(): boolean {
        return this.estado_pedido;
    }

    public GetRelatorio(): string {
        return this.relatorio;
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

    public SetEstado_pedido(estado_pedido: boolean): void {
        this.estado_pedido = estado_pedido;
    }

    public SetRelatorio(relatorio: string): void {
        this.relatorio = relatorio;
    }
}