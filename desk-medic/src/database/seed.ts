import { Consulta } from '../models/consulta';
import { Pedido } from '../models/pedido';


export async function SeedDatabase(): Promise<boolean> {
    var consulta = new Consulta(1);
    await consulta.save();
    var pedido = new Pedido(1, consulta);
    await pedido.save();
    return true;
}