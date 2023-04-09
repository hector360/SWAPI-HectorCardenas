import { Request, Response } from 'express'
import { getAllPages, getPlanetOrPeople, insertPlanet, insertPerson, getPlanetData, getPersonData, getDBPlanets, getDBPeople, getPersonLastId, getPersonByName } from '../functions/swapi-functions';
import { createPlanetsTable, createPersonTable } from '../functions/postgresql-functions';
import { InternalErrorException} from '../errors/internal-error';

export const getPlanets = async (req: Request, res: Response) => {

  const page = parseInt(req.query.page?.toString() ?? '1', 10);


  try {
    const data = await getAllPages('planets', page);
    res.json(data);
  } catch (error) {
    throw new InternalErrorException('Failed to fetch data from SWAPI.');
    
  }
}

export const getPeople = async (req: Request, res: Response) => {

  const page = parseInt(req.query.page?.toString() ?? '1', 10);
  if (!page || isNaN(page) || page < 1) {
    return res.status(400).json({ error: 'Invalid page number. Page number should be a positive integer.' });
  }

  try {
    const data = await getAllPages('people', page);
    res.status(200).json(data);
  } catch (error) {
    throw new InternalErrorException('Failed to fetch data from SWAPI.');
  }
}

export const getPlanet = async (req: Request, res: Response) => {

  try {
    const planetId = parseInt(req.params.planetId, 10);
    const data = await getPlanetOrPeople('planets', planetId)
    await createPlanetsTable()
    const planet = await getPlanetData(planetId);
    if (!planet || planet.length === 0) {
      console.log('Planet does not exists')
      if (data) {
        await insertPlanet(parseInt(req.params.planetId), data.climate, data.diameter, data.gravity, data.name, data.population, data.residents, data.terrain, data.url)
      }

    }

    res.status(200).json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new InternalErrorException(error.message);
    } else {
      throw new InternalErrorException('An unexpected internal error occurred');
    }
  }

}

export const getPerson = async (req: Request, res: Response) => {

  try {
    const personId = parseInt(req.params.personId, 10);
    const data = await getPlanetOrPeople('people', personId)
    await createPersonTable()
    const person = await getPersonData(personId);
    if (!person || person.length === 0) {
      console.log('Person does not exists')
      if (data) {
        await insertPerson(personId, data.name, data.birth_year, data.eye_color, data.gender, data.hair_color, data.height, data.homeworld, data.mass, data.skin_color, data.created, data.edited, data.url)
      }

    }
    // let theperson = await getDBPeople();

    res.status(200).json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new InternalErrorException(error.message);
    } else {
      throw new InternalErrorException('An unexpected internal error occurred');
    }
  }

}

export const createPerson = async (req: Request, res: Response) => {

  const {
    name,
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    homeworld,
    mass,
    skin_color,
    created,
    edited,
    url
  } = req.body;
  try {
    await createPersonTable()

    let last_person = await getPersonLastId();

    let person_id;
    if (last_person == null || last_person.length === 0 || parseInt(last_person[0].person_id) < 1000) {
      person_id = 1000;
    } else {
      person_id = parseInt(last_person[0].person_id) + 1;
    }
    let personName = await getPersonByName(name);

    if (personName?.length !== 0) {
      console.log('this name is in use')
      res.status(400).json('The name is already in use')
    }
    await insertPerson(person_id, name, birth_year, eye_color, gender, hair_color, height, homeworld, mass, skin_color, created, edited, url)
    res.status(200).json('Person added succesfully')
    //checar si la persona que existe el person id es menor que 1000


  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new InternalErrorException(error.message);
    } else {
      throw new InternalErrorException('An unexpected internal error occurred');
    }
  }

}

export const getAllpeople = async (req: Request, res: Response) => {
  let people = await getDBPeople()
  console.log(people)
  res.status(200).json(people)
}