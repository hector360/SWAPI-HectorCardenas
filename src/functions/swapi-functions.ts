import axios, { AxiosResponse  } from 'axios';
import { QueryResult  } from 'pg';
import { pool } from '../database/config';

const SWAPI_BASE_URL = 'https://swapi.dev/api';



interface SwapiResult {
    results: any[];
}
interface Planet {
  climate: string;
  diameter: string;
  gravity: string;
  name: string;
  population: string;
  residents: string[];
  terrain: string;
  url: string;
}
interface Person {
  person_id: string;
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  created: string;
  edited: string;
  url: string;
}

export const getAllPages = async (endpoint: string, pageLimit: number): Promise<any[]> => {
let results: any[] = [];
let nextPage = 1;
while (nextPage <= pageLimit) {
  try {
    const response: AxiosResponse<SwapiResult> = await axios.get(`${SWAPI_BASE_URL}/${endpoint}/?page=${nextPage}`);
    results = results.concat(response.data.results);
    nextPage++;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching page ${nextPage}: ${error.message}`);
    } else {
      console.error(`An unexpected error occurred while fetching page ${nextPage}`);
    }
    break;
  }
}
return results;
}

export const getPlanetOrPeople = async (
  endpoint: string,
  id: number
): Promise<Planet & Person | null> => {
  try {
    const response: AxiosResponse<Planet & Person> = await axios.get(`${SWAPI_BASE_URL}/${endpoint}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data for ${endpoint} with ID ${id}: ${error.message}`
      );
    } else {
      console.error(
        `An unexpected error occurred while fetching data for ${endpoint} with ID ${id}`
      );
    }
    return null;
  }
};


export const insertPlanet = async (
  planet_id: number,
  climate: string,
  diameter: string,
  gravity: string,
  name: string,
  population: string,
  residents: string[],
  terrain: string,
  url: string
): Promise<void> => {
  try {
    await pool.query(
      'INSERT INTO planets (planet_id, climate, diameter, gravity, name, population, residents, terrain, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [planet_id, climate, diameter, gravity, name, population, JSON.stringify(residents), terrain, url]
    );
    console.log('Planet inserted successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error inserting planet: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while inserting the planet');
    }
  }
};

export const insertPerson = async (
  person_id: number,
  name: string,
  birth_year: string,
  eye_color: string,
  gender: string,
  hair_color: string,
  height: string,
  homeworld: string,
  mass: string,
  skin_color: string,
  created: string,
  edited: string,
  url: string,
): Promise<void> => {
  try {
    await pool.query(
      'INSERT INTO people (person_id, name, birth_year, eye_color, gender, hair_color, height, homeworld, mass, skin_color, created, edited, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
      [person_id, name, birth_year, eye_color, gender, hair_color, height, homeworld, mass, skin_color, created, edited, url,]
    );
    console.log('Person inserted successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error inserting person: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while inserting the Person');
    }
  }
};

export const getPlanetData = async (planet_id: number): Promise<Planet[] | null> => {
  try {
    const result: QueryResult<Planet> = await pool.query('SELECT * FROM planets WHERE planet_id = $1', [planet_id]);
    return result.rows;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching planets: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while fetching planets');
    }
    return null;
  }
};
export const getPersonData = async (person_id: number): Promise<Person[] | null> => {
  try {
    const result: QueryResult<Person> = await pool.query('SELECT * FROM people WHERE person_id = $1', [person_id]);
    return result.rows;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching planets: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while fetching person');
    }
    return null;
  }
};

export const getPersonByName = async (name: string): Promise<Person[] | null> => {
  try {
    const result: QueryResult<Person> = await pool.query('SELECT * FROM people WHERE name = $1', [name]);
    return result.rows;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching planets: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while fetching person');
    }
    return null;
  }
};


export const getDBPlanets = async (): Promise<Planet[] | null> => {
  try {
    const result: QueryResult<Planet> = await pool.query('SELECT * FROM planets ');
    return result.rows;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching planets: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while fetching planets');
    }
    return null;
  }
};

export const getDBPeople = async (): Promise<Person[] | null> => {
  try {
    const result: QueryResult<Person> = await pool.query('SELECT * FROM people ');
    return result.rows;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching person: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while fetching person');
    }
    return null;
  }
};

export const getPersonLastId = async (): Promise<Person[] | null> => {
  try {
    const result: QueryResult<Person> = await pool.query('SELECT * FROM people ORDER BY person_id DESC LIMIT 1 ');
    return result.rows;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching person: ${error.message}`);
    } else {
      console.error('An unexpected error occurred while fetching person');
    }
    return null;
  }
};

