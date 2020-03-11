import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Genero } from './genero';

@Entity('Doente')
export class Doente extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: number;

    @Column({ name: 'num_utente' })
    private num_utente: string;

    @Column({ name: 'nome' })
    private nome: string;

    @Column({ name: 'telefone' })
    private telefone: string;

    @Column({
        name: 'genero',
        type: 'enum',
        enum: Genero
    })
    private genero: Genero;

    constructor(num_utente: string, nome: string, telefone: string, genero: Genero) {
        super();
        this.num_utente = num_utente;
        this.nome = nome;
        this.telefone = telefone;
        this.genero = genero;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getNum_utente(): string {
        return this.num_utente;
    }

    public setNum_utente(num_utente: string): void {
        this.num_utente = num_utente;
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

}