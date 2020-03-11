import { getRepository } from 'typeorm';
import { Doente } from '../models/doente';
import { Genero } from '../models/genero';

export async function createDoente(id: number, nome: string, telefone: string, num_utente: string, genero: Genero): Promise<Doente> {
    let doente: Doente = new Doente(id, nome, telefone, num_utente, genero);
    await doente.save().catch(err => { console.log(err) });
    return doente;
}

export async function getDoentes(): Promise<Doente[]> {
    let doente: Doente[] = await getRepository(Doente).find();
    return doente;
}

export async function getDoente(num_utente: string): Promise<Doente> {
    let doente: Doente = await getRepository(Doente).findOne({ where: { num_utente: num_utente } });
    return doente;
}