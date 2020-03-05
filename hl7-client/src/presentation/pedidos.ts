//imports
import clear from 'clear';
import { getRepository } from 'typeorm';
import chalk from 'chalk';
//local
import { Pedido } from '../models/pedido';
import { MainMenuView } from './main_menu';
import { CreateTable } from './tables';


export function VerEstadoPedidosView(): void {
    clear();
    getRepository(Pedido).find()
        .then(async (pedidos: Pedido[]) => {

            if (pedidos.length == 0) {
                console.log(chalk.redBright('Não existem pedidos...'));
                MainMenuView();
                return;
            }

            var pedidosRow: any[] = [];

            for (let index = 0; index < pedidos.length; index++) {
                const pedido: Pedido = pedidos[index];

                let num_pedido: number = pedido.GetNumero_Pedido();
                let data_hora: Date = pedido.GetData_hora();
                let data_hora_formatted: string = `${data_hora.getDate()}-${data_hora.getMonth() + 1}-${data_hora.getFullYear()} ${data_hora.getHours()}:${data_hora.getMinutes()}`;
                let consulta: number = pedido.GetConsulta().GetIdentificador();
                let estado: string = (pedido.GetEstado()) ? 'Realizado' : 'Não realizado';

                pedidosRow.push([num_pedido, data_hora_formatted, consulta, estado]);
            }

            var table = CreateTable(
                ['Nº Pedido', 'Data e Hora', 'Consulta', 'Estado'],
                pedidosRow);
            console.log(table.toString());
            MainMenuView();
        })
        .catch(err => {
            console.log(chalk.redBright(err));
        });
}