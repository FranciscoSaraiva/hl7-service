import { getRepository } from 'typeorm';
import { Doente } from '../models/doente';
import { Genero } from '../models/genero';

export async function createDoente(num_utente: string, nome: string, telefone: string, genero: Genero): Promise<Doente> {
    let doente: Doente = new Doente(num_utente, nome, telefone, genero);
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