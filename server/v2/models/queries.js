const createUserTable = `
    CREATE TABLE IF NOT EXISTS
        users (
            id  SERIAL PRIMARY KEY,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            username VARCHAR(50) NOT NULL,
            is_admin boolean NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdOn timestamp without time zone
)`;

const createEntryTable = `
    CREATE TABLE IF NOT EXISTS
        entries(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          location VARCHAR(255) NOT NULL,
          status VARCHAR(255) NOT NULL,
          images VARCHAR(255) NOT NULL,
          videos VARCHAR(255) NOT NULL,
          comment TEXT NOT NULL,
          createdBy INT NOT NULL,
          createdOn timestamp without time zone,
          updatedOn timestamp without time zone,
          FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE
)`;

const deleteAllTables = `
    DROP TABLE IF EXISTS
        users, entries`;

const addUser = `
    INSERT INTO
        users (firstname, lastname, email, phone_number, username, is_admin, password, createdOn)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;

const findOneUser = `select * from users where email= $1`;

const findOneUsername = `select * from users where username= $1`;

export default {
    createUserTable,
    createEntryTable,
    deleteAllTables,
    findOneUser,
    findOneUsername,
    addUser
};
