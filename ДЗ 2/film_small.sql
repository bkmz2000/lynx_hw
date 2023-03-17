CREATE TABLE genre(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE film(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    year INT
);

CREATE TABLE film_genre(
    film_id INT REFERENCES film(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genre(id) ON DELETE CASCADE
);