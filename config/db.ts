import { connection, connect } from 'mongoose';

export function setupConnection() : void {
    connect('mongodb://localhost/performance-app');

    var db = connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function(){
        console.log('Database connection established!');
    })
}