//imports
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import clear from 'clear';
//local
import { ConnectingDatabaseView, ConnectedDatabaseView, SeedingDatabaseView } from './presentation/database';
import { MainMenuView } from './presentation/main_menu';
import { SeedDatabase } from './database/seed';
import { Logo } from './presentation/application';

ConnectingDatabaseView();
createConnection().then(async connection => {
    clear();
    console.log(connection);
    ConnectedDatabaseView();
    SeedingDatabaseView();
    await SeedDatabase();
    Logo();
    MainMenuView();
}).catch(error => {
    console.log('An error occured creating the connection...');
    console.log(error);
})