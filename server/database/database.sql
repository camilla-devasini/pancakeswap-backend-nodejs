CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);
INSERT INTO users(username, passhash) values($1, $2);

-- creo la TABLE users con 3 colonne: id, username, passhash
-- imposto che i valori parametrizzati $1 e $2 dovranno occupare le colonne username e passhash
-- incollo questo codice sql di create table.. e insert into.. nel terminale postgres dopo
-- essermi connesso al database: \c users_db

