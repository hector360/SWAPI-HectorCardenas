import { pool } from '../database/config';

export const createPlanetsTable = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS planets (
          id SERIAL PRIMARY KEY,
          planet_id INTEGER,
          climate VARCHAR(40),
          diameter VARCHAR(40),
          gravity VARCHAR(40),
          name VARCHAR(40),
          population VARCHAR(40),
          residents TEXT,
          terrain VARCHAR(40),
          url VARCHAR(255)
        );
      `);
      console.log('Planets table created successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error creating planets table: ${error.message}`);
      } else {
        console.error('An unexpected error occurred while creating the planets table');
      }
    }
  };

  export const createPersonTable = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS people (
            id SERIAL PRIMARY KEY,
            person_id INTEGER,
            name VARCHAR(40),
            birth_year VARCHAR(40),
            eye_color VARCHAR(40),
            gender VARCHAR(40),
            hair_color VARCHAR(40),
            height VARCHAR(40),
            homeworld VARCHAR(40),
            mass VARCHAR(40),
            skin_color VARCHAR(40),
            created VARCHAR(40),
            edited VARCHAR(40),
            url VARCHAR(40)
        );
      `);
      console.log('People table created successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error creating person table: ${error.message}`);
      } else {
        console.error('An unexpected error occurred while creating the people table');
      }
    }
  };
