//import
import { Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Consulta')
export class Consulta extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'identificador' })
    private identificador: number;

    //Get
    public GetIdentificador(): number {
        return this.identificador;
    }

    //Set
    public SetIdentificador(identificador: number): void {
        this.identificador = identificador;
    }

}