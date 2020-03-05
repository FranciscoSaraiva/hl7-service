//imports
import clear from 'clear';
import { getRepository } from 'typeorm';
//local
import { Pedido } from '../models/pedido';

export function EmitirRelatorioView(): void {
    clear();
    getRepository(Pedido).find({ where: { estado: true } })
        .then((pedidos: Pedido[]) => {
            console.log(pedidos);

            var consulta;
        })
        .catch((err) => {
            console.log(err);
        })
}