import { getRepository } from 'typeorm';
import { Doente } from '../models/doente';

export async function createDoente(num_utente: string, nome: string, telefone: string): Promise<Doente> {
    let doente: Doente = new Doente(num_utente, nome, telefone);
    await doente.save();
    return doente;
}

export async function getDoente(num_utente: string): Promise<Doente> {
    let doente: Doente = await getRepository(Doente).findOne({ where: { num_utente: num_utente } });
    return doente;
}