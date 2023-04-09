CREATE DATABASE swapi;

CREATE TABLE planets(
    id SERIAL PRIMARY KEY,
    planet_id VARCHAR(40),
    climate VARCHAR(40),
    diameter VARCHAR(40),
    gravity VARCHAR(40),
    name VARCHAR(40),
    population VARCHAR(40),
    residents VARCHAR(40),
    terrain VARCHAR(40),
    url VARCHAR(40),
);

-- INSERT INTO planets(planet_id, climate, diameter, gravity, name, population, residents, terrain, url) Va