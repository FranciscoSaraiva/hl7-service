//import
import { Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Consulta')
export class Consulta extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'identificador' })
    private identificador: Number;

    //Get
    public GetIdentificador(): Number {
        return this.identificador;
    }

    //Set
    public SetIdentificador(identificador: Number): void {
        this.identificador = identificador;
    }

}