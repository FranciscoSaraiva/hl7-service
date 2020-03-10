import { BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, Entity } from 'typeorm';
import { Exame } from './exame';
import { Doente } from './doente';

@Entity('Pedido')
export class Pedido extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: number;

    @ManyToOne(type => Exame, { eager: true, cascade: true })
    private exame: Exame;

    @ManyToOne(type => Doente, { eager: true, cascade: true })
    private doente: Doente;

    @Column({ name: 'estado' })
    private estado: boolean;

    @Column({ name: 'data_hora' })
    private data_hora: Date;

    constructor(exame: Exame, doente: Doente) {
        super();
        this.exame = exame;
        this.doente = doente;
        this.estado = false;
        this.data_hora = new Date();
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getExame(): Exame {
        return this.exame;
    }

    public setExame(exame: Exame): void {
        this.exame = exame;
    }

    public isEstado(): boolean {
        return this.estado;
    }

    public setEstado(estado: boolean): void {
        this.estado = estado;
    }

    public getData_hora(): Date {
        return this.data_hora;
    }

    public setData_hora(data_hora: Date): void {
        this.data_hora = data_hora;
    }

    public getDoente(): Doente {
        return this.doente;
    }

    public setDoente(doente: Doente): void {
        this.doente = doente;
    }


}