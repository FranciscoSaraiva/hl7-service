//import
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Doente')
export class Doente extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'identificador' })
  private identificador: Number;

  @Column({ name: 'numero_processo', type: 'int' })
  private numero_processo: Number;

  @Column({ name: 'morada', type: 'varchar' })
  private morada: String;

  @Column({ name: 'telefone', type: 'int' })
  private telefone: Number;

  constructor(numero_processo: Number, morada: String, telefone: Number) {
    super();
    this.numero_processo = numero_processo;
    this.morada = morada;
    this.telefone = telefone;
  }

  //Gets
  public GetIdentificador(): Number {
    return this.identificador;
  }

  public GetNumero_processo(): Number {
    return this.numero_processo;
  }

  public GetMorada(): String {
    return this.morada;
  }

  public GetTelefone(): Number {
    return this.telefone;
  }

  //Sets
  public SetIdentificador(identificador: Number): void {
    this.identificador = identificador;
  }

  public SetNumero_processo(numero_processo: Number): void {
    this.numero_processo = numero_processo;
  }

  public SetMorada(morada: String): void {
    this.morada = morada;
  }

  public SetTelefone(telefone: Number): void {
    this.telefone = telefone;
  }
}