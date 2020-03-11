import { getRepository } from 'typeorm';
import { Exame } from '../models/exame';

export async function createExame(id: number, descricao: string, relatorio: string, tipo_exame: string, ): Promise<Exame> {
    let exame: Exame = new Exame(id, descricao, relatorio, tipo_exame);
    await exame.save().catch(err => { console.log(err) });
    return exame;
}

export async function getExames(): Promise<Exame[]> {
    let exames: Exame[] = await getRepository(Exame).find();
    return exames;
}

export async function getExame(num_utente: string): Promise<Exame> {
    let exame: Exame = await getRepository(Exame).findOne({ where: { num_utente: num_utente } });
    return exame;
}