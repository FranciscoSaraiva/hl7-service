//import
import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('Consulta')
export class Consulta extends BaseEntity {

    @PrimaryColumn({ name: 'identificador', type: 'int' })
    private identificador: number;

    @Column({ name: 'relatorio', type: 'varchar' })
    private relatorio: string;

    constructor(identificador: number) {
        super();
        this.identificador = identificador;
        this.relatorio = '';
    }

    //Get
    public GetIdentificador(): number {
        return this.identificador;
    }

    public GetRelatorio(): string {
        return this.relatorio;
    }

    //Set
    public SetIdentificador(identificador: number): void {
        this.identificador = identificador;
    }

    public SetRelatorio(relatorio: string): void {
        this.relatorio = relatorio;
    }
}