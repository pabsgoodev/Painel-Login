import mysql, { type Connection } from 'mysql2/promise';

let db: Connection | null = null;

export async function getDBConnection(): Promise<Connection> {
    if (!db) {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'silvablo',
            database: 'appdb'
        });

        console.log('Connected to the database.');
    }

    return db;
}
