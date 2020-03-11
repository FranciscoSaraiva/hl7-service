import { Pedido } from '../models/pedido';
import { Worklist } from '../models/worklist';

export async function createWorklist(pedido: Pedido): Promise<Worklist> {
    let worklist: Worklist = await new Worklist(pedido);
    await worklist.save().catch(err => { console.log(err) });
    return worklist;
}