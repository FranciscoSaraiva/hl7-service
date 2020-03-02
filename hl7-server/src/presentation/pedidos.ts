//imports
import { getRepository } from 'typeorm';
import chalk from 'chalk';
import clear from 'clear';
//local
import { Pedido } from '../models/pedido';
import { CreateTable } from './tables';
import { MainMenuView } from './main_menu';


export function VerPedidosView(): void {
    clear();
    getRepository(Pedido).find()
        .then((pedidos: Pedido[]) => {

            if (pedidos.length == 0) {
                console.log(chalk.redBright('Não existem pedidos...'));
                MainMenuView();
                return;
            }
            var pedidosRow: any[];
            pedidos.forEach((pedido: Pedido) => {
                let num_pedido = pedido.GetNumero_Pedido();
                let data_hora = pedido.GetData_hora();
                let consulta = pedido.GetConsulta().GetIdentificador();
                let doente = pedido.GetDoente().GetIdentificador();
                let ato_medico = pedido.GetAto_Medico().GetAto();

                pedidosRow.push([num_pedido, data_hora, consulta, doente, ato_medico]);
            })

            var table = CreateTable(
                ['Nº Pedido', 'Data e Hora', 'Consulta', 'Doente', 'Ato Médico'],
                pedidos);
            console.log(table.toString());
            MainMenuView();
        })
        .catch(err => {
            console.log(chalk.redBright(err));
        });
}