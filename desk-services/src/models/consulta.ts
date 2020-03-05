//import
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity('Consulta')
export class Consulta extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'identificador' })
    private identificador: number;

    @Column({ name: 'relatorio', type: 'varchar' })
    private relatorio: string;

    constructor() {
        super();
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