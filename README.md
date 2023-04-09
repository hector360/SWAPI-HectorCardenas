# SWAPI PROJECT BY HECTOR MARIANO CARDENAS SIERRA

Hello, here is a brief description of my project:
This project is developed with Node Js (Express.js), implementing the Typescript language,
The project is running on port 3000, so the url of the project would look like:
'http://localhost:3000/'.
The project consists of five routes:
1)'/api/planets' - This route makes a query to the "SWAPI" api for which all the data is obtained from there, we have to pass a page parameter to the route which will contain a larger positive numeric > 1.
2)'/api/people' - This route is exactly the same as the previous one, it only changes the people value in the url, this means that we will search for people
3)'/api/planets/:planetId' - This route also consults the SWAPI api but it will be passed a numerical value as a parameter to indicate the planet to be located, we call this variable planetId
4)'/api/people/:personId' - This route does exactly what the previous one does, the difference is that we are looking for a specific person using the personId parameter
5)'/api/people' This is the only post type, this is the one in charge of inserting new people into the database, we must send several parameters in the body which are: "name", "birth_year", "eye_color", "gender", "hair_color", "height", "homeworld", "mass", "skin_color", "created", "edited"

The project is made with postgresql as database you need to create a database called swapi or change the config.ts in database directory.


### Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
git clone https://github.com/hector360/SWAPI-HectorCardenas.git
2. Navigate to the project directory:
cd SWAPI-HectorCardenas
3. Install the dependencies:
npm install
4. Start the development server:
npm start

5. Open a browser and access the application at `http://localhost:3000/`.

## FOR TASK 2. TOP Customer - SQL QUERY

there is a file called topcustomer.sql in database directory, there are the queries that i used to resolve the second task