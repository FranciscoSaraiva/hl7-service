import { getRepository } from 'typeorm';
import { Exame } from '../models/exame';
import { TipoExame } from '../models/tipo_exame';

export async function createExame(descricao: string, tipo_exame: TipoExame): Promise<Exame> {
    let exame: Exame = new Exame(descricao, tipo_exame);
    await exame.save().catch(err => { console.log(err) });
    return exame;
}

export async function getExame(exame_id: number): Promise<Exame> {
    let exame: Exame = await getRepository(Exame).findOne({ where: { id: exame_id } });
    return exame;
}