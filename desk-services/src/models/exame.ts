import { BaseEntity, ManyToOne, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { TipoExame } from './tipo_exame';

@Entity('Exame')
export class Exame extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: number;

    @ManyToOne(type => TipoExame, { eager: true, cascade: true })
    private tipo_exame: TipoExame;

    @Column({ name: 'descricao' }) //OBR
    private descricao: string;

    @Column({ name: 'relatorio' }) //TX
    private relatorio: string;

    constructor(descricao: string, tipo_exame: TipoExame) {
        super();
        this.descricao = this.descricao;
        this.relatorio = '';
        this.tipo_exame = tipo_exame;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public getRelatorio(): string {
        return this.relatorio;
    }

    public setRelatorio(relatorio: string): void {
        this.relatorio = relatorio;
    }

    public getTipo_exame(): TipoExame {
        return this.tipo_exame;
    }

    public setTipo_exame(tipo_exame: TipoExame): void {
        this.tipo_exame = tipo_exame;
    }

}