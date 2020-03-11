import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Exame')
export class Exame extends BaseEntity {

    @PrimaryColumn({ name: 'id' })
    private id: number;

    @Column({ name: 'descricao' })
    private descricao: string;

    @Column({ name: 'relatorio' })
    private relatorio: string;

    @Column({ name: 'tipo_exame' })
    private tipo_exame: string;

    constructor(id: number, descricao: string, relatorio: string, tipo_exame: string) {
        super();
        this.id = id;
        this.descricao = descricao;
        this.relatorio = relatorio;
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

    public getTipo_exame(): string {
        return this.tipo_exame;
    }

    public setTipo_exame(tipo_exame: string): void {
        this.tipo_exame = tipo_exame;
    }
}