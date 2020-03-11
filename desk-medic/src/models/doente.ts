import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import { Genero } from './genero';

@Entity('Doente')
export class Doente extends BaseEntity {

    @PrimaryColumn({ name: 'id' })
    private id: number;

    @Column({ name: 'nome' })
    private nome: string;

    @Column({ name: 'telefone' })
    private telefone: string;

    @Column({ name: 'num_utente' })
    private num_utente: string;

    @Column({
        name: 'genero',
        type: 'enum'
    })
    private genero: Genero;

    constructor(id: number, nome: string, telefone: string, num_utente: string, genero: Genero) {
        super();
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.num_utente = num_utente;
        this.genero = genero;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public getNum_utente(): string {
        return this.num_utente;
    }

    public setNum_utente(num_utente: string): void {
        this.num_utente = num_utente;
    }
}