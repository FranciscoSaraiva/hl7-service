//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
//class
import { Doente } from './doente';
import { Consulta } from './consulta';
import { AtoMedico } from './ato_medico';

@Entity('Pedido')
export class Pedido extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'numero_pedido' })
    private numero_pedido: Number;

    @Column({ name: 'data_hora', type: 'datetime' })
    private data_hora: Date;

    @OneToOne(type => Consulta, { eager: true })
    @JoinColumn()
    private consulta: Consulta;

    @OneToOne(type => Consulta, { eager: true })
    @JoinColumn()
    private doente: Doente;

    @OneToOne(type => Consulta, { eager: true })
    @JoinColumn()
    private ato_medico: AtoMedico;


    constructor(consulta: Consulta, doente: Doente, ato_medico: AtoMedico) {
        super();
        this.consulta = consulta;
        this.doente = doente;
        this.ato_medico = ato_medico;
    }

    //Gets
    public GetNumero_Pedido(): Number {
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

    //Sets
    public SetNumero_Pedido(numero_pedido: Number): void {
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

}




