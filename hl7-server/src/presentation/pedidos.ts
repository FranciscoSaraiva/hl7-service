//imports
import { getRepository } from 'typeorm';
import chalk from 'chalk';
import clear from 'clear';
import inquirer from 'inquirer';
//local
import { Pedido } from '../models/pedido';
import { CreateTable } from './tables';
import { MainMenuView } from './main_menu';
import { Doente } from '../models/doente';
import { AtoMedico } from '../models/ato_medico';
import { Consulta } from '../models/consulta';


export async function CriarPedidoView(): Promise<void> {
    clear();
    var doentes = await getRepository(Doente).find();
    let doentesList: string[] = [];
    doentes.forEach((doente: Doente) => {
        doentesList.push(doente.GetNumero_processo().toString());
    });

    var atos = await getRepository(AtoMedico).find();
    let atosList: string[] = [];
    atos.forEach((ato: AtoMedico) => {
        atosList.push(ato.GetAto());
    });

    inquirer.prompt([
        { type: 'list', name: 'doente', message: 'Qual o doente?', choices: doentesList },
        { type: 'list', name: 'ato_medico', message: 'Qual o ato médico?', choices: atosList }
    ]).then(async answer => {
        let doente_answer = answer.doente;
        let ato_medico_answer = answer.ato_medico;

        var consulta = new Consulta();
        await consulta.save();

        var doente: Doente = await Doente.findByNumeroProcesso(doente_answer);
        var ato_medico: AtoMedico = await AtoMedico.findByAto(ato_medico_answer);

        console.log(doente);
        console.log(ato_medico);
        var pedido = new Pedido(consulta, doente, ato_medico);

        await pedido.save();

        clear();
        MainMenuView();
    })
}

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
            console.log(pedidos)
            
            process.exit(0);
            pedidos.forEach((pedido: Pedido) => {
                let num_pedido = pedido.GetNumero_Pedido();
                let data_hora = pedido.GetData_hora();
                let consulta = pedido.GetConsulta().GetIdentificador();
                let doente = pedido.GetDoente().GetNumero_processo();
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