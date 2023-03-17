CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE genre(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE film(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    year INT,
    genre_id INT REFERENCES genre(id) ON DELETE CASCADE,
    moto VARCHAR(100),
    director INT REFERENCES person(id) ON DELETE CASCADE,
    screenwriter INT REFERENCES person(id) ON DELETE CASCADE,
    producer INT REFERENCES person(id) ON DELETE CASCADE,
    operator INT REFERENCES person(id) ON DELETE CASCADE,
    composer INT REFERENCES person(id) ON DELETE CASCADE,
    design INT REFERENCES person(id) ON DELETE CASCADE,
    budget INT,
    marketing INT,
    us_box_office INT,
    release DATE,
    rus_release DATE,
    rating VARCHAR(10),
    duration INT
);

CREATE TABLE main_character(
    person_id INT REFERENCES person(id) ON DELETE CASCADE,
    film_id INT REFERENCES film(id) ON DELETE CASCADE
);

CREATE TABLE views(
    film_id INT REFERENCES film(id) ON DELETE CASCADE,
    count INT
);

CREATE TABLE dubbing(
    person_id INT REFERENCES person(id) ON DELETE CASCADE,
    film_id INT REFERENCES film(id)
);
