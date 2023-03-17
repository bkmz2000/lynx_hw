export function getAllFilms(req, resp) {
    this.database.query('SELECT name, year FROM film;', (error, result) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 200;
        resp.end(JSON.stringify(result.rows));
    });
}

export function getAllGanres(req, resp) {
    this.database.query('SELECT name FROM genre;', (error, result) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 200;
        resp.end(JSON.stringify(result.rows));
    });
}

export function createFilm(req, resp, body) {
    const { name, year } = body;
    this.database.query('INSERT INTO film(name, year) VALUES ($1, $2)', [name, year], (error, result) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 201;
        resp.end(`film (${name}, ${year}) created`);
    });
}

export function createGenre(req, resp, body) {
    const { name } = body;

    this.database.query('INSERT INTO genre(name) VALUES ($1)', [name], (error, result) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 201;
        resp.end(`ganre ${name} created`);
    });
}

export function getGanre(req, resp, body) {
    let { name, year } = body;

    this.database.query(`
    SELECT genre.name 
    FROM film 
        INNER JOIN film_genre ON film.name = $1 AND film.year = $2 AND film.id = film_id 
        INNER JOIN genre ON genre.id = genre_id;
        `, [name, year], (error, res) => {
        if (error) {
            throw Error;
        }

        resp.statusCode = 201;
        resp.end(JSON.stringify(res.rows));
    });
}

export function getFilms(req, resp, body) {
    let { name } = body;

    this.database.query(`
    SELECT film.name 
    FROM film 
        INNER JOIN film_genre ON film.id = film_id 
        INNER JOIN genre ON genre.name = $1 AND genre.id = genre_id
        `, [name], (error, res) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 200;
        resp.end(JSON.stringify(res.rows));
    });
}

export function updateGenre(req, resp, body) {
    const { old_name, new_name } = body;

    this.database.query(`
        UPDATE genre
        SET name = $1
        WHERE name = $2;
    `, [new_name, old_name], (error, answer) => {
        if (error) {
            throw Error;
        }

        resp.statusCode = 200;
        resp.end(`updated: was ${JSON.stringify({ old_name })} now ${JSON.stringify({ new_name })}`);
    });
}

export function updateFilm(req, resp, body) {
    const { old_name, new_name, old_year, new_year } = body;

    this.database.query(`
        UPDATE film
        SET 
            name = $1,
            year = $2
        WHERE 
            name = $3 AND
            year = $4;
    `, [new_name, new_year, old_name, old_year], (error, answer) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 200;
        resp.end(`updated: was ${JSON.stringify({ old_name, old_year })} now ${JSON.stringify({ new_name, new_year })}`);
    });
}

export function deleteGenre(req, resp, body) {
    const { name } = body;

    this.database.query(`
        DELETE FROM film_genre
        WHERE
            genre_id IN (SELECT id FROM genre WHERE name=$1);`,
        [name])
        .then(
            this.database.query(`
                DELETE FROM genre
                WHERE 
                    name = $1;`,
                [name],
                (error, answer) => {
                    if (error) {
                        throw error;
                    }

                    resp.statusCode = 200;
                    resp.end(`deleted: ${{ name }}`);
                }));
}

export function deleteFilm(req, resp, body) {
    const { name, year } = body;

    this.database.query(`
        DELETE FROM film
        WHERE 
            name = $1 AND
            year = $2;
    `, [name, year], (error, answer) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 200;
        resp.end(`deleted: ${JSON.stringify({ name, year })}`);
    });
}

export function bindFilmToGenre(req, resp, body) {
    const { fname, year, gname } = body;

    this.database.query(`
    WITH 
        film_id_query AS (
            SELECT id FROM film WHERE name = $1 AND year = $2
        ),
        genre_id_query AS (
            SELECT id FROM genre WHERE name = $3
        )
    INSERT INTO film_genre(film_id, genre_id) 
    SELECT 
        (SELECT id FROM film_id_query), 
        (SELECT id FROM genre_id_query);
    `, [fname, year, gname], (error, result) => {
        if (error) {
            throw error;
        }

        resp.statusCode = 200;
        resp.end(`bound: ${JSON.stringify({ fname, year })} to ${JSON.stringify({ gname })}`);
    });
}