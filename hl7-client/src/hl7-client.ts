//imports
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import clear from 'clear';
//local
import { ConnectingDatabaseView, ConnectedDatabaseView, SeedingDatabaseView } from './presentation/database';
import { MainMenuView } from './presentation/main_menu';
import { Logo } from './presentation/application';

clear();
ConnectingDatabaseView();
createConnection().then(async connection => {
    clear();
    console.log(connection);
    ConnectedDatabaseView();
    clear();
    Logo();
    MainMenuView();
}).catch(error => {
    console.log('An error occured creating the connection...');
    console.log(error);
})