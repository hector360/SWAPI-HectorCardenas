import { Pool } from 'pg';

export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '#V3dr0tc3h95.',
    database: 'swapi',
    port: 5432
});