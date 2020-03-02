//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Doente')
export class Doente extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'identificador' })
  private identificador: number;

  @Column({ name: 'numero_processo', type: 'int' })
  private numero_processo: number;

  @Column({ name: 'morada', type: 'varchar' })
  private morada: string;

  @Column({ name: 'telefone', type: 'int' })
  private telefone: number;

  constructor(numero_processo: number, morada: string, telefone: number) {
    super();
    this.numero_processo = numero_processo;
    this.morada = morada;
    this.telefone = telefone;
  }

  //Gets
  public GetIdentificador(): number {
    return this.identificador;
  }

  public GetNumero_processo(): number {
    return this.numero_processo;
  }

  public GetMorada(): string {
    return this.morada;
  }

  public GetTelefone(): number {
    return this.telefone;
  }

  //Sets
  public SetIdentificador(identificador: number): void {
    this.identificador = identificador;
  }

  public SetNumero_processo(numero_processo: number): void {
    this.numero_processo = numero_processo;
  }

  public SetMorada(morada: string): void {
    this.morada = morada;
  }

  public SetTelefone(telefone: number): void {
    this.telefone = telefone;
  }

  static findByNumeroProcesso(numero_processo: number) {
    return this.createQueryBuilder('doente')
      .where('doente.numero_processo = :numero_processo', { numero_processo })
      .getOne();
  }
}