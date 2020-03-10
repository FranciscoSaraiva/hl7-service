import { getRepository } from 'typeorm';
import { TipoExame } from '../models/tipo_exame';

export async function createTipoExame(sigla: string, descricao: string): Promise<TipoExame> {
    let tipo_exame: TipoExame = new TipoExame(sigla, descricao);
    await tipo_exame.save().catch(err => { console.log(err) });
    return tipo_exame;
}

export async function getTipoExames(): Promise<TipoExame[]> {
    let tipo_exame: TipoExame[] = await getRepository(TipoExame).find();
    return tipo_exame;
}

export async function getTipoExame(descricao: string): Promise<TipoExame> {
    let tipo_exame: TipoExame = await getRepository(TipoExame).findOne({ where: { descricao: descricao } });
    return tipo_exame;
}