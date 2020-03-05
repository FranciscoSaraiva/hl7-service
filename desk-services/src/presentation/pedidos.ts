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

        var pedido = new Pedido(consulta, doente, ato_medico);

        await pedido.save();

        clear();
        MainMenuView();
    })
}

export function VerPedidosView(): void {
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
                let consulta: number = pedido.GetConsulta().GetIdentificador();

                let doente: Doente = await getRepository(Doente).findOne({ where: { identificador: pedido.GetDoente().GetIdentificador() } });
                let doente_proc = doente.GetNumero_processo();

                let ato_medico: AtoMedico = await getRepository(AtoMedico).findOne({ where: { identificador: pedido.GetAto_Medico().GetIdentificador() } });
                let ato_medico_ato: string = ato_medico.GetAto();

                let num_pedido: number = pedido.GetNumero_Pedido();
                let data_hora: Date = pedido.GetData_hora();
                let data_hora_formatted: string = `${data_hora.getDate()}-${data_hora.getMonth() + 1}-${data_hora.getFullYear()} ${data_hora.getHours()}:${data_hora.getMinutes()}`;

                pedidosRow.push([num_pedido, data_hora_formatted, consulta, doente_proc, ato_medico_ato]);
            }

            var table = CreateTable(
                ['Nº Pedido', 'Data e Hora', 'Consulta', 'Doente', 'Ato Médico'],
                pedidosRow);
            console.log(table.toString());
            MainMenuView();
        })
        .catch(err => {
            console.log(chalk.redBright(err));
        });
}