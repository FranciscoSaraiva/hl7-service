//imports
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import clear from 'clear';
//local
import { ConnectingDatabase, ConnectedDatabase } from './presentation/database';
import { Logo } from './presentation/application';

ConnectingDatabase();
createConnection().then(async connection => {
    clear();
    console.log(connection);
    ConnectedDatabase();
    Logo();
}).catch(error => {
    console.log('An error occured creating the connection...')
    console.log(error)
})