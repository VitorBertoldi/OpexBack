import { createConnection } from 'mysql2';
import { config } from 'dotenv';

config();

export const db = createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((error) => {
    if (error) {
        console.log('Error connecting to the database:', error);
    } else {
        console.log('Database connected');
    }
});
