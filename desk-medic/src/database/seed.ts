import { createDoente } from '../application/doentes';
import { createExame } from '../application/exames';
import { createPedido } from '../application/pedidos';
import { Exame } from '../models/exame';
import { Doente } from '../models/doente';


export async function SeedDatabase(): Promise<boolean> {
    let doente: Doente = await createDoente(1, 'Chico', '911111111', '111111111');
    let exame: Exame = await createExame(1, 'Radiografia ao torax', '', 'Radiologia');
    await createPedido(1, exame, doente);
    return true;
}