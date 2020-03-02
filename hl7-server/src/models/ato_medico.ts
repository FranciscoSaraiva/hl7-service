//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('AtoMedico')
export class AtoMedico extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'identificador' })
    private id: number;

    @Column({ name: 'ato' })
    private ato: string;

    constructor(ato: string) {
        super();
        this.ato = ato;
    }

    //Gets
    public GetId(): number {
        return this.id;
    }

    public GetAto(): string {
        return this.ato;
    }
    //Sets
    public SetId(id: number): void {
        this.id = id;
    }

    public SetAto(ato: string): void {
        this.ato = ato;
    }

    static findByAto(ato: string) {
        return this.createQueryBuilder('atomedico')
            .where('atomedico.ato = :ato', { ato })
            .getOne();
    }
}