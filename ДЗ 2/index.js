import pg from 'pg';
import { Server } from './server.js'

import {
    getAllFilms,
    createFilm,
    updateFilm,
    deleteFilm,
    getAllGanres,
    createGenre,
    updateGenre,
    deleteGenre,
    bindFilmToGenre,
    getFilms,
    getGanre,
} from './function.js'

const { Pool } = pg;

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'films_small',
    password: 'password',
    port: 5432,
});

const server = new Server(3000, pool);

server.get('/films', getAllFilms);
server.post('/films', createFilm);
server.put('/films', updateFilm);
server.delete('/films', deleteFilm);

server.get('/genres', getAllGanres);
server.post('/genres', createGenre);
server.put('/genres', updateGenre);
server.delete('/genres', deleteGenre);

server.post('/bindFilmToGenre', bindFilmToGenre);

server.get('/getGenre', getGanre); // film => [genre]
server.get('/getFilms', getFilms); // genre => [films]

server.listen();