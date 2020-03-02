//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('AtoMedico')
export class AtoMedico extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'identificador' })
    private id: Number;

    @Column({ name: 'ato' })
    private ato: String;

    constructor(ato: String) {
        super();
        this.ato = ato;
    }

    //Gets
    public GetId(): Number {
        return this.id;
    }

    public GetAto(): String {
        return this.ato;
    }
    //Sets
    public SetId(id: Number): void {
        this.id = id;
    }

    public SetAto(ato: String): void {
        this.ato = ato;
    }
}