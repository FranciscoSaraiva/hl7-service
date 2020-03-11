import { Pedido } from '../models/pedido';
import { Worklist } from '../models/worklist';

export async function createPedido(pedido: Pedido): Promise<Worklist> {
    let worklist: Worklist = new Worklist(pedido);
    await worklist.save().catch(err => { console.log(err) });
    return worklist;
}
