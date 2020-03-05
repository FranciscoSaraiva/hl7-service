//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, JoinTable } from 'typeorm';
//class
import { Doente } from './doente';
import { Consulta } from './consulta';
import { AtoMedico } from './ato_medico';

@Entity('Pedido')
export class Pedido extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'numero_pedido' })
    private numero_pedido: number;

    @Column({ name: 'data_hora', type: 'datetime' })
    private data_hora: Date;

    @ManyToOne(type => Consulta, { eager: true, cascade: true })
    @JoinTable()
    private consulta: Consulta;

    @ManyToOne(type => Consulta, { eager: true, cascade: true })
    @JoinTable()
    private doente: Doente;

    @ManyToOne(type => Consulta, { eager: true, cascade: true })
    @JoinTable()
    private ato_medico: AtoMedico;

    @Column({ name: 'estado', type: 'boolean' })
    private estado: boolean;

    constructor(consulta: Consulta, doente: Doente, ato_medico: AtoMedico) {
        super();
        this.data_hora = new Date();
        this.consulta = consulta;
        this.doente = doente;
        this.ato_medico = ato_medico;
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

    public GetDoente(): Doente {
        return this.doente;
    }

    public GetAto_Medico(): AtoMedico {
        return this.ato_medico;
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

    public SetDoente(doente: Doente): void {
        this.doente = doente;
    }

    public SetAto_Medico(ato_medico: AtoMedico): void {
        this.ato_medico = ato_medico;
    }

    public SetEstado(estado: boolean): void {
        this.estado = estado;
    }

}




