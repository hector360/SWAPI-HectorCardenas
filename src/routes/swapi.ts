import express, { Request, Response} from 'express';
import { body, param, query, validationResult  } from 'express-validator';
import { getPlanets, getPeople, getPlanet, getPerson, createPerson, getAllpeople } from '../controllers/swapiController';
import { validateRequest } from '../middlewares/validate-request';


const router = express.Router();

router.get('/api/planets', 
[
    query('page')
        .trim()
        .isInt({ gt: 0 })
        .withMessage('Page number should be a positive integer.'),
], 
validateRequest,
getPlanets)

router.get('/api/people', 
[
    query('page')
        .trim()
        .isInt({ gt: 0 })
        .withMessage('Page number should be a positive integer.'),
], 
validateRequest,
getPeople)

router.get('/api/planets/:planetId', 
[
    param('planetId')
        .trim()
        .isInt({ gt: 0 })
        .withMessage('planetId number should be a positive integer.'),
], 
validateRequest,
getPlanet)

router.get('/api/people/:personId', 
[
    param('personId')
        .trim()
        .isInt({ gt: 0 })
        .withMessage('personId number should be a positive integer.'),
], 
validateRequest,
getPerson)

router.post('/api/people', 
[
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('birth_year')
        .trim()
        .notEmpty()
        .withMessage('Date is required')
        .isLength({ min: 2 })
        .withMessage('Date must be at least 2 characters long'),
    body('eye_color')
        .notEmpty()
        .withMessage('Eye color is required')
        .isLength({ min: 2 })
        .withMessage('Eye color must be at least 2 characters long'),
    body('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isLength({ min: 2 })
        .withMessage('Gender color must be at least 2 characters long'),
    body('hair_color')
        .notEmpty()
        .withMessage('Hair color is required')
        .isLength({ min: 2 })
        .withMessage('Hair color must be at least 2 characters long'),
    body('height')
        .notEmpty()
        .withMessage('Height is required')
        .isInt({ gt: 0 })
        .withMessage('Height should be a positive integer.'),
    body('homeworld')
        .notEmpty()
        .withMessage('home World is required')
        .isLength({ min: 2 })
        .withMessage('home World must be at least 2 characters long'),
    body('mass')
        .notEmpty()
        .withMessage('Mass is required')
        .isInt({ gt: 0 })
        .withMessage('Mass should be a positive integer.'),
    body('skin_color')
        .notEmpty()
        .withMessage('Skin color is required')
        .isLength({ min: 2 })
        .withMessage('Skin color must be at least 2 characters long'),
    body('created')
        .trim()
        .notEmpty()
        .withMessage('Created is required')
        .isISO8601()
        .withMessage('Created must be in ISO 8601 format'),
    body('edited')
        .trim()
        .notEmpty()
        .withMessage('Edited is required')
        .isISO8601()
        .withMessage('Edited must be in ISO 8601 format'),
        
], 
validateRequest,
createPerson)

router.get('/api/get-all-people', getAllpeople)


export { router as planetsRouter}