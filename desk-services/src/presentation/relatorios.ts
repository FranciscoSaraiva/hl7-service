//imports
import { getRepository } from 'typeorm';
import inquirer from 'inquirer';
import clear from 'clear';
import chalk from 'chalk';
//local
import { Consulta } from '../models/consulta';
import { MainMenuView } from './main_menu';


export async function VerRelatorios(): Promise<void> {

    var consultas: Consulta[] = await getRepository(Consulta).find();

    var consultas_list: string[] = [];

    for (let index = 0; index < consultas.length; index++) {
        var consulta = consultas[index];
        consultas_list.push(consulta.GetIdentificador().toString());
    }

    inquirer.prompt([
        { type: 'list', name: 'consulta', message: 'Qual a consulta?', choices: consultas_list },
    ]).then(async answer => {
        clear();
        var consulta: Consulta = await getRepository(Consulta).findOne({ where: { identificador: answer.consulta } });
        let relatorio = (consulta.GetRelatorio().length > 0) ? consulta.GetRelatorio() : '(N/A)';
        console.log(chalk.redBright('Consulta: ') + consulta.GetIdentificador());
        console.log(chalk.redBright('Relatório: ') + relatorio);
        await console.log('\n\n')
        MainMenuView();
    })
}