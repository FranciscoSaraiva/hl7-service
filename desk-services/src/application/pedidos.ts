import { getRepository } from 'typeorm';
import { Exame } from '../models/exame';
import { Doente } from '../models/doente';
import { Pedido } from '../models/pedido';

export async function createPedido(exame: Exame, doente: Doente): Promise<Pedido> {
    let pedido: Pedido = new Pedido(exame, doente);
    await pedido.save().catch(err => { console.log(err) });
    return pedido;
}

export async function getPedidos(): Promise<Pedido[]> {
    let pedidos: Pedido[] = await getRepository(Pedido).find();
    return pedidos;
}

export async function getPedido(id: number): Promise<Pedido> {
    let pedido: Pedido = await getRepository(Pedido).findOne({ where: { id: id } });
    return pedido;
}
