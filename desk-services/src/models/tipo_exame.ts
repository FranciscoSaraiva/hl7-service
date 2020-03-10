import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('TipoExame')
export class TipoExame extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: number;

    @Column({ name: 'sigla' })
    private sigla: string;

    @Column({ name: 'descricao' })
    private descricao: string;

    constructor(sigla: string, descricao: string) {
        super();
        this.sigla = sigla;
        this.descricao = descricao;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getSigla(): string {
        return this.sigla;
    }

    public setSigla(sigla: string): void {
        this.sigla = sigla;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }
}